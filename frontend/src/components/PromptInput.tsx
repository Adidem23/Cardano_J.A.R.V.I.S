"use client";


import {
  PromptInput as PKPromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "../components/prompt-kit/prompt-input";

import { Button } from "@/components/ui/button";
import { ArrowUp, Square, Mic } from "lucide-react";



import { useState } from "react";
import type { Message } from "./Chat";

interface Props {
  onSend: (msg: Message) => void;
}

export default function PromptInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // ---- SEND MESSAGE ----
  const handleSend = () => {
    if (!text.trim()) return;

    setIsLoading(true);

    onSend({
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    });

    setText("");

    setTimeout(() => setIsLoading(false), 300); // UI animation
  };

  // ---- SPEECH INPUT ----
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      setText(event.results[0][0].transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  return (
    <PKPromptInput
      value={text}
      onValueChange={setText}
      isLoading={isLoading}
      onSubmit={handleSend}
      className="w-full max-w-(--breakpoint-md)"
    >
      <PromptInputTextarea
  placeholder="Send a message..."
  value={text}
  onChange={(e) => setText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }}

  />

      <PromptInputActions className="justify-end pt-2 flex gap-2 items-center">
        {/* MIC BUTTON */}
        <PromptInputAction tooltip="Start voice input">
          <Button
            variant="outline"
            size="icon"
            onClick={startListening}
            className={`h-8 w-8 rounded-full transition ${
              isListening ? "bg-red-500 text-white" : ""
            }`}
          >
            <Mic className="size-4" />
          </Button>
        </PromptInputAction>

        {/* SEND BUTTON */}
        <PromptInputAction tooltip="Send message">
          <Button
            variant="default"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleSend}
          >
            {isLoading ? (
              <Square className="size-5 fill-current" />
            ) : (
              <ArrowUp className="size-5" />
            )}
          </Button>
        </PromptInputAction>
      </PromptInputActions>
    </PKPromptInput>
  );
}
