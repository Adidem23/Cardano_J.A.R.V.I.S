import { motion } from "framer-motion";
import { type Tempmsg } from "./Chat";
import { User, Sparkles } from "lucide-react";

export default function MessageList({ messages }: { messages: Tempmsg[] }) {
  return (
    <div className="flex flex-col gap-6 p-8 max-w-4xl mx-auto">
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
          className={`flex gap-4 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {msg.role === "assistant" && (
            <motion.div
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 mt-0.5"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-orange-400" />
            </motion.div>
          )}

          <motion.div
            className={`
              max-w-[70%] rounded-2xl px-5 py-4
              ${msg.role === "user"
                ? "bg-gradient-to-br from-orange-600/70 to-orange-700/60 text-white shadow-[0_8px_32px_rgba(251,146,60,0.25)]"
                : "bg-zinc-900/80 text-zinc-100 border border-zinc-800/50 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              }
            `}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              {msg.role === "assistant" && (
                <div className="absolute -top-2 -left-2 w-2 h-2 rounded-full bg-orange-500/50 blur-sm" />
              )}
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          </motion.div>

          {msg.role === "user" && (
            <motion.div
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 mt-0.5"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.2 }}
            >
              <User className="w-5 h-5 text-zinc-400" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
