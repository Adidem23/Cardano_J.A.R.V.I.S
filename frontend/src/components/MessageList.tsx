import { useEffect, useRef } from "react";
import type { Tempmsg } from "./Chat";

import {
  ChatContainerRoot,
  ChatContainerContent,
  ChatContainerScrollAnchor,
} from "./ui/chat-container";

import { Message, MessageContent } from "./ui/message";
// Markdown is unused here because MessageContent handles markdown rendering
import { ScrollButton } from "./ui/scroll-button"; // <-- Add this

export default function MessageList({ messages }: { messages: Tempmsg[] }) {
  const bottomRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <ChatContainerRoot className="flex-1 px-6 py-6 relative">

      <ChatContainerContent className="space-y-6 max-w-3xl mx-auto">

        {messages.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center text-muted-foreground">
            <div className="w-12 h-12 rounded-xl bg-gray-700/60 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                <path d="M12 2.5l2.3 4.7 5.2.8-3.8 3.7.9 5.2L12 15.9l-4.6 2.4.9-5.2L4.5 8l5.2-.8L12 2.5z" fill="currentColor" opacity="0.14" />
                <path d="M12 4.2l1.6 3.2 3.5.5-2.6 2.5.6 3.4L12 13.4l-3.1 1.6.6-3.4L6.9 7.9l3.5-.5L12 4.2z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-2">Start a conversation</h2>
            <p className="max-w-lg text-sm">
              Send a message to begin chatting. I'm here to help with anything you need.
            </p>
          </div>
          ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <Message className="max-w-[80%]">
                <MessageContent markdown>
                  {msg.content}
                </MessageContent>
              </Message>
            </div>
          ))
        )}

        <ChatContainerScrollAnchor ref={bottomRef} />
      </ChatContainerContent>

      {/* FLOATING SCROLL BUTTON */}
  <ScrollButton />
    </ChatContainerRoot>
  );
}
