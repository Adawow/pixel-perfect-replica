import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { ChatStatus } from "ai";
import { RotateCcw } from "lucide-react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  usePromptInputController,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { getCompanion, type Companion } from "@/data/companions";
import { useDeviceStorage } from "@/hooks/use-device-storage";
import {
  CHAT_LIMITS,
  chatErrorMessage,
  chatStorageKey,
  contextWindow,
  parseChatHistory,
  type ChatStreamEvent,
  type StoredChatMessage,
} from "@/lib/companion-chat";
import type { GameId } from "@/types/game";
import { choiceClass } from "./choice";

const EMPTY: StoredChatMessage[] = [];
const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function Portrait({ companion, size }: { companion: Companion; size: "sm" | "lg" }) {
  const { portrait } = companion;
  return (
    <span
      className={
        size === "lg"
          ? "flex h-28 w-28 shrink-0 items-end justify-center overflow-hidden rounded-full border border-journey/40 bg-[radial-gradient(circle_at_50%_70%,var(--journey-tint),transparent_70%)] md:h-36 md:w-36"
          : "flex h-8 w-8 shrink-0 items-end justify-center overflow-hidden rounded-full border border-journey/40 bg-secondary"
      }
    >
      <img
        src={portrait.src}
        alt={size === "lg" ? portrait.alt : ""}
        width={portrait.width}
        height={portrait.height}
        loading="lazy"
        className="h-[92%] w-auto object-contain object-bottom"
      />
    </span>
  );
}

export function CompanionChat({ gameId }: { gameId: GameId }) {
  return (
    <PromptInputProvider>
      <ChatWindow key={gameId} gameId={gameId} />
    </PromptInputProvider>
  );
}

function ChatWindow({ gameId }: { gameId: GameId }) {
  const companion = getCompanion(gameId);
  const [messages, setMessages, loaded] = useDeviceStorage(chatStorageKey(gameId), parseChatHistory, EMPTY);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<ChatStatus>("ready");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const controller = usePromptInputController();
  const { ask } = useSearch({ from: "/journey/$gameId" });
  const navigate = useNavigate();
  const busy = status === "submitted" || status === "streaming";

  const focusInput = useCallback(() => {
    if (window.matchMedia("(pointer: fine)").matches) formRef.current?.querySelector("textarea")?.focus({ preventScroll: true });
  }, []);

  // A question handed over from another tool is placed in the box, never sent automatically.
  useEffect(() => {
    if (!ask) return;
    controller.textInput.setInput(ask.slice(0, CHAT_LIMITS.maxMessageChars));
    void navigate({ to: "/journey/$gameId", params: { gameId }, search: { section: "ai-companion" }, replace: true, resetScroll: false });
    formRef.current?.querySelector("textarea")?.focus({ preventScroll: true });
  }, [ask, controller.textInput, gameId, navigate]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const request = useCallback(
    async (history: StoredChatMessage[]) => {
      const abort = new AbortController();
      abortRef.current = abort;
      setError(null);
      setDraft("");
      setStatus("submitted");
      let text = "";
      let failure: string | null = null;
      try {
        const res = await fetch("/api/companion-chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ gameId, messages: contextWindow(history) }),
          signal: abort.signal,
        });
        if (!res.ok || !res.body) {
          failure = chatErrorMessage(res.status);
        } else {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let finished = false;
          while (!finished) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              if (!line.trim()) continue;
              const event = JSON.parse(line) as ChatStreamEvent;
              if (event.type === "delta") {
                text += event.text;
                setDraft(text);
                setStatus("streaming");
              } else if (event.type === "error") {
                failure = event.message;
                finished = true;
              } else {
                finished = true;
              }
            }
          }
          if (!text.trim() && !failure) failure = chatErrorMessage(500);
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) failure = chatErrorMessage(0);
      }
      if (text.trim()) {
        setMessages((prev) => [...prev, { id: newId(), role: "assistant" as const, text }].slice(-CHAT_LIMITS.maxStoredMessages));
      }
      setDraft("");
      setError(failure);
      setStatus(failure ? "error" : "ready");
      abortRef.current = null;
      focusInput();
    },
    [gameId, setMessages, focusInput],
  );

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim().slice(0, CHAT_LIMITS.maxMessageChars);
      if (!text || busy) return;
      const next = [...messages, { id: newId(), role: "user" as const, text }].slice(-CHAT_LIMITS.maxStoredMessages);
      setMessages(next);
      void request(next);
    },
    [busy, messages, request, setMessages],
  );

  const onSubmit = (message: PromptInputMessage) => send(message.text);
  const retry = () => {
    if (messages.at(-1)?.role === "user") void request(messages);
  };
  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setDraft("");
    setStatus("ready");
    focusInput();
  };

  const empty = loaded && messages.length === 0 && !busy;

  return (
    <section aria-label={`Chat with ${companion.name}`} className="flex flex-col border border-border bg-secondary/30">
      <header className="flex flex-col gap-5 border-b border-border p-5 sm:flex-row sm:items-center md:p-6">
        <Portrait companion={companion} size="lg" />
        <div className="flex-1">
          <p className="eyebrow text-journey">Your companion</p>
          <h3 className="mt-1 font-display text-3xl font-light text-foreground">
            {companion.name} <span className="italic text-muted-foreground">{companion.title}</span>
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{companion.intro}</p>
        </div>
        <button type="button" onClick={reset} disabled={messages.length === 0 && !busy} className={`${choiceClass(false)} self-start disabled:cursor-not-allowed disabled:opacity-40 sm:self-center`}>
          New conversation
        </button>
      </header>

      <Conversation className="h-[min(62vh,560px)] min-h-80">
        <ConversationContent className="gap-6 p-5 md:p-6">
          {!loaded && <Shimmer className="text-sm">Opening the conversation…</Shimmer>}
          {empty && (
            <div className="flex flex-col gap-5 py-6">
              <p className="max-w-xl font-display text-2xl italic leading-snug text-foreground/90">“{companion.welcome}”</p>
              <div>
                <p className="eyebrow mb-3">Try asking</p>
                <Suggestions className="flex-wrap">
                  {companion.suggestions.map((s) => (
                    <Suggestion key={s} suggestion={s} onClick={send} className="rounded-none border-border bg-transparent text-muted-foreground hover:border-journey/50 hover:bg-journey/10 hover:text-foreground" />
                  ))}
                </Suggestions>
              </div>
            </div>
          )}
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} companion={companion} />
          ))}
          {status === "submitted" && (
            <div className="flex items-center gap-3">
              <Portrait companion={companion} size="sm" />
              <Shimmer className="text-sm">{`${companion.name} is thinking…`}</Shimmer>
            </div>
          )}
          {status === "streaming" && draft && (
            <ChatBubble message={{ id: "draft", role: "assistant", text: draft }} companion={companion} streaming />
          )}
          {error && (
            <div role="alert" className="flex flex-wrap items-center justify-between gap-3 border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-foreground">
              <span>{error}</span>
              {messages.at(-1)?.role === "user" && (
                <button type="button" onClick={retry} className={`${choiceClass(false)} inline-flex items-center gap-2`}>
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Try again
                </button>
              )}
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div ref={formRef} className="border-t border-border p-4 md:p-5">
        <PromptInput onSubmit={onSubmit} className="bg-background">
          <PromptInputTextarea placeholder={companion.placeholder} maxLength={CHAT_LIMITS.maxMessageChars} aria-label={`Message ${companion.name}`} />
          <PromptInputFooter className="justify-between">
            <span className="px-2 text-xs text-faint">Enter to send · Shift + Enter for a new line</span>
            <PromptInputSubmit status={status} onStop={() => abortRef.current?.abort()} disabled={!busy && !controller.textInput.value.trim()} aria-label={busy ? "Stop" : "Send"} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </section>
  );
}

function ChatBubble({ message, companion, streaming }: { message: StoredChatMessage; companion: Companion; streaming?: boolean }) {
  if (message.role === "user") {
    return (
      <Message from="user">
        <MessageContent className="group-[.is-user]:rounded-none group-[.is-user]:bg-foreground group-[.is-user]:text-background">
          <p className="whitespace-pre-wrap">{message.text}</p>
        </MessageContent>
      </Message>
    );
  }
  return (
    <Message from="assistant">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-journey">
        <Portrait companion={companion} size="sm" />
        {companion.name}
      </p>
      <MessageContent className="text-[0.95rem] leading-relaxed">
        <MessageResponse isAnimating={Boolean(streaming)}>{message.text}</MessageResponse>
      </MessageContent>
    </Message>
  );
}
