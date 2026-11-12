import { createFileRoute } from "@tanstack/react-router";
import { chatRequestSchema, type ChatStreamEvent } from "@/lib/companion-chat";

const json = (status: number, message: string) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

/** Streams one companion reply as newline-delimited JSON events. */
export const Route = createFileRoute("/api/companion-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json(400, "Invalid request.");
        }
        const parsed = chatRequestSchema.safeParse(body);
        if (!parsed.success) return json(400, parsed.error.issues[0]?.message ?? "Invalid request.");

        const { gameId, messages } = parsed.data;
        // Server-only modules load inside the handler so they never reach the browser bundle.
        const [{ streamResponse, GatewayError }, { companionInstructions }] = await Promise.all([
          import("@lovable.dev/ai-gateway"),
          import("@/lib/companion-instructions.server"),
        ]);

        let stream;
        try {
          stream = await streamResponse(
            {
              model: "openai/gpt-6-astra",
              instructions: companionInstructions(gameId),
              input: messages.map((m) =>
                m.role === "user"
                  ? { role: "user" as const, content: m.content }
                  : {
                      role: "assistant" as const,
                      content: [{ type: "output_text" as const, text: m.content, annotations: [] }],
                    },
              ),
              reasoning: { effort: "low" },
              max_output_tokens: 2000,
            },
            { signal: request.signal },
          );
        } catch (error) {
          console.error("companion-chat: request failed", error);
          const status = error instanceof GatewayError ? (error.httpStatus ?? 502) : 500;
          return json(status === 429 || status === 402 ? status : 502, "The companion couldn't answer just now.");
        }

        const encoder = new TextEncoder();
        const send = (controller: ReadableStreamDefaultController<Uint8Array>, event: ChatStreamEvent) =>
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));

        const body$ = new ReadableStream<Uint8Array>({
          async start(controller) {
            try {
              for await (const event of stream) {
                if (event.type === "response.output_text.delta") send(controller, { type: "delta", text: event.delta });
                else if (event.type === "response.refusal.delta") send(controller, { type: "delta", text: event.delta });
                else if (event.type === "response.incomplete") break;
              }
              send(controller, { type: "done" });
            } catch (error) {
              console.error("companion-chat: stream failed", error);
              send(controller, { type: "error", message: "The answer was interrupted. Please try again." });
            } finally {
              controller.close();
            }
          },
        });

        return new Response(body$, {
          headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" },
        });
      },
    },
  },
});
