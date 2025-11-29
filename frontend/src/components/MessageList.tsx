import { useEffect, useRef } from "react";
import type { Message } from './Chat'
import ReactMarkdown from "react-markdown";

export default function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center text-muted-foreground">
            <div className="w-12 h-12 rounded-xl bg-sidebar-primary flex items-center justify-center mb-4">✨</div>
            <h2 className="text-lg font-semibold mb-2">Start a conversation</h2>
            <p className="max-w-lg text-sm">Send a message to begin chatting. I'm here to help with any questions you might have.</p>
          </div>
        ) : (
          messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Avatar */}
            {msg.role !== "user" && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted text-muted-foreground">
                🤖
              </div>
            )}

            {/* Bubble */}
            <div
              className={`p-4 rounded-2xl shadow-sm text-sm break-words whitespace-pre-wrap max-w-[80%] ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground ml-6"
                  : "bg-muted text-muted-foreground mr-6"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>

            {msg.role === "user" && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                🧑
              </div>
            )}
          </div>
          ))
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
