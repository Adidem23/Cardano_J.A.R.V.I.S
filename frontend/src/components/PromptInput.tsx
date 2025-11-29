import { Send, Mic, Square } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import type { Tempmsg } from "./Chat";
import axios from "axios";

interface Props {
  onSend: (msg: Tempmsg) => void;
}

export default function PromptInput({ onSend }: Props) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const BACKEND_URL = "http://localhost:8000/processUserQuery";

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [text]);

  const handleSend = async () => {
    if (!text.trim() || isLoading) return;

    const userText = text.trim();

    const userMsg: Tempmsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: userText,
    };
    onSend(userMsg);

    setText("");
    setIsLoading(true);

    try {
      const res = await axios.post(BACKEND_URL, {
        actualQueryString: userText,
      });

      const data = res.data;

      const assistantText =
        data?.content || data?.reply || data?.message || data[0]?.text || "";

      const assistantMsg: Tempmsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          assistantText || "Sorry — I couldn't get a valid response from the server.",
      };

      onSend(assistantMsg);
    } catch (error: any) {
      console.error("Backend error:", error);

      onSend({
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Error: ${error?.response?.data?.error || error.message || "Request failed."}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      className="w-full max-w-3xl"
    >
      <div className="relative flex items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask J.A.R.V.I.S anything..."
            rows={1}
            className="w-full rounded-2xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl px-6 py-4 pr-24 text-[15px] text-zinc-100 placeholder-zinc-500 outline-none transition-all duration-200 focus:border-orange-500/50 focus:bg-zinc-900/70 focus:ring-2 focus:ring-orange-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] resize-none min-h-[56px] max-h-[200px] overflow-y-auto"
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <motion.button
              type="button"
              onClick={startListening}
              className={`p-2 rounded-lg transition-colors ${
                isListening
                  ? "bg-red-500/20 border border-red-500/50"
                  : "bg-zinc-800/50 hover:bg-zinc-800"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mic
                className={`w-4 h-4 ${
                  isListening ? "text-red-400" : "text-zinc-400"
                }`}
              />
            </motion.button>

            <motion.button
              type="submit"
              disabled={!text.trim() || isLoading}
              className={`p-2 rounded-lg transition-all duration-200 ${
                text.trim() && !isLoading
                  ? "bg-gradient-to-br from-orange-600/80 to-orange-700/70 hover:from-orange-600/90 hover:to-orange-700/80"
                  : "bg-zinc-800/50 cursor-not-allowed"
              }`}
              whileHover={text.trim() && !isLoading ? { scale: 1.1 } : {}}
              whileTap={text.trim() && !isLoading ? { scale: 0.9 } : {}}
            >
              {isLoading ? (
                <Square className="w-4 h-4 text-white fill-current" />
              ) : (
                <Send
                  className={`w-4 h-4 ${
                    text.trim() ? "text-white" : "text-zinc-600"
                  }`}
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-2">
        <p className="text-xs text-zinc-500">
          Press Enter to send, Shift + Enter for new line
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-600">Powered by</span>
          <span className="text-xs font-semibold text-orange-500">
            Cardano AI
          </span>
        </div>
      </div>
    </form>
  );
}
