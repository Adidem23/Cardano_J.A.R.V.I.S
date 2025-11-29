import { motion } from "framer-motion";
import { type Tempmsg } from "./Chat";
import { User, Sparkles } from "lucide-react";

export default function MessageList({ messages }: { messages: Tempmsg[] }) {
  return (
    <div className="flex flex-col gap-4 p-6 pb-0 max-w-4xl mx-auto w-full">
      {messages.map((msg, idx) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: idx * 0.05,
            ease: [0.22, 0.8, 0.35, 1],
          }}
          className={`flex gap-3 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {msg.role === "assistant" && (
            <motion.div
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
            </motion.div>
          )}

          <motion.div
            className={`
              max-w-[75%] sm:max-w-[70%] md:max-w-[65%] rounded-xl px-4 py-2.5 break-words
              ${msg.role === "user"
                ? "bg-gradient-to-br from-orange-600/70 to-orange-700/60 text-white shadow-[0_4px_16px_rgba(251,146,60,0.2)]"
                : "bg-zinc-900/80 text-zinc-100 border border-zinc-800/50 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
              }
            `}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              {msg.role === "assistant" && (
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 rounded-full bg-orange-500/50 blur-sm" />
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap overflow-wrap-anywhere">
                {msg.content}
              </p>
            </div>
          </motion.div>

          {msg.role === "user" && (
            <motion.div
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.2 }}
            >
              <User className="w-4 h-4 text-zinc-400" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
