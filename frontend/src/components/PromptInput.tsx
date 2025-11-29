import { useState, useRef, useEffect } from "react";
import {type Tempmsg } from "./Chat";
import {
  PromptInput as PromptInputKit,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputAction,
} from "./prompt-kit/prompt-input";
import { SendHorizontal, Mic, Square } from "lucide-react";

interface Props {
  onSend: (msg: Tempmsg) => void;
}

export default function PromptInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceRecordingComplete, setVoiceRecordingComplete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSendTimerRef = useRef<NodeJS.Timeout | null>(null);

  const BACKEND_URL = "http://localhost:8000/processUserQuery";

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  useEffect(() => {
    if (voiceRecordingComplete && text.trim()) {
      autoSendTimerRef.current = setTimeout(() => {
        handleSend();
        setVoiceRecordingComplete(false);
      }, 2000);
    }

    return () => {
      if (autoSendTimerRef.current) {
        clearTimeout(autoSendTimerRef.current);
      }
    };
  }, [voiceRecordingComplete, text]);

  const handleSend = async () => {
    if (!text.trim() || isLoading) return;

    if (autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
      autoSendTimerRef.current = null;
    }

    const userText = text.trim();

    const userMsg: Tempmsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: userText,
    };
    onSend(userMsg);

    setText("");
    setIsLoading(true);
    setVoiceRecordingComplete(false);

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: Tempmsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response || "No response from server.",
      };
      onSend(assistantMsg);
    } catch (error: any) {
      const errorMsg: Tempmsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Error: ${error.message}`,
      };
      onSend(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceRecordingComplete(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setVoiceRecordingComplete(true);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setVoiceRecordingComplete(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    setVoiceRecordingComplete(false);
    if (autoSendTimerRef.current) {
      clearTimeout(autoSendTimerRef.current);
      autoSendTimerRef.current = null;
    }
  };

  return (
    <PromptInputKit
      value={text}
      onValueChange={setText}
      onSubmit={handleSend}
      isLoading={isLoading}
      className="w-full max-w-3xl"
    >
      <PromptInputTextarea
        ref={textareaRef}
        placeholder={
          isListening 
            ? "Listening..." 
            : voiceRecordingComplete 
            ? "Sending in 2 seconds..." 
            : "Type a message or use voice..."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <PromptInputActions className="gap-2">
        {isListening ? (
          <PromptInputAction tooltip="Stop recording">
            <button
              onClick={stopListening}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
            >
              <Square className="w-4 h-4 text-red-400" />
            </button>
          </PromptInputAction>
        ) : (
          <PromptInputAction tooltip="Voice input">
            <button
              onClick={startListening}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 transition-colors"
            >
              <Mic className="w-4 h-4 text-orange-400" />
            </button>
          </PromptInputAction>
        )}
        <PromptInputAction tooltip="Send message">
          <button
            onClick={handleSend}
            disabled={!text.trim() || isLoading}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:cursor-not-allowed transition-colors"
          >
            <SendHorizontal className="w-4 h-4 text-white" />
          </button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInputKit>
  );
}