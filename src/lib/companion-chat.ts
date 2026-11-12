import { z } from "zod";

/** Limits keep each request small and protect the site's AI credits. */
export const CHAT_LIMITS = {
  maxMessageChars: 2000,
  /** Only the most recent turns are sent as context. */
  maxContextMessages: 16,
  maxStoredMessages: 60,
} as const;

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(CHAT_LIMITS.maxMessageChars * 4),
});

export const chatRequestSchema = z
  .object({
    gameId: z.enum(["elden-ring", "hollow-knight", "sekiro"]),
    messages: z.array(chatMessageSchema).min(1).max(CHAT_LIMITS.maxContextMessages),
  })
  .refine((r) => r.messages.at(-1)?.role === "user", { message: "The last message must come from the player." })
  .refine(
    (r) => r.messages.every((m) => m.role !== "user" || m.content.length <= CHAT_LIMITS.maxMessageChars),
    { message: "A message is too long." },
  );

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatRole = ChatRequest["messages"][number]["role"];

export interface StoredChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

/** Events streamed from the server, one JSON object per line. */
export type ChatStreamEvent =
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };

/** Keep the newest turns, starting on a player message so context reads naturally. */
export function contextWindow(messages: StoredChatMessage[]): ChatRequest["messages"] {
  const recent = messages.slice(-CHAT_LIMITS.maxContextMessages);
  const start = recent.findIndex((m) => m.role === "user");
  return (start < 0 ? [] : recent.slice(start)).map((m) => ({ role: m.role, content: m.text }));
}

const storedSchema = z.array(
  z.object({ id: z.string(), role: z.enum(["user", "assistant"]), text: z.string() }),
);

/** Reads device history defensively; anything malformed starts a fresh conversation. */
export function parseChatHistory(raw: unknown): StoredChatMessage[] {
  const result = storedSchema.safeParse(raw);
  return result.success ? result.data.slice(-CHAT_LIMITS.maxStoredMessages) : [];
}

export const chatStorageKey = (gameId: string) => `bonfire.chat.${gameId}`;

/** Plain-language explanation for a failed request. */
export function chatErrorMessage(status: number): string {
  if (status === 429) return "Too many questions at once. Wait a moment, then try again.";
  if (status === 402) return "The site has run out of AI credits. The owner needs to top up Lovable AI credits.";
  if (status === 400) return "That message couldn't be sent. Try a shorter question.";
  return "The companion couldn't answer just now. Please try again.";
}
