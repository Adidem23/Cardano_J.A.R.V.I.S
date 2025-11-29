import { useState, useRef, useEffect } from "react";
import MessageList from "./MessageList";
import PromptInput from "./PromptInput";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Sparkles, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export type Tempmsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type ChatSession = {
  id: string;
  title: string;
  messages: Tempmsg[];
};

export default function Chat() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: crypto.randomUUID(), title: "New Chat", messages: [] }
  ]);
  const recentSendsRef = useRef<Map<string, number>>(new Map());
  const [currentSessionId, setCurrentSessionId] = useState(sessions[0].id);
  const currentSession = sessions.find(s => s.id === currentSessionId)!;

  const handleNewChat = () => {
    const newSession = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: []
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
  };

  const handleRename = (id: string) => {
    const newName = prompt("Enter new chat name:");
    if (!newName) return;
    setSessions(prev =>
      prev.map(s => s.id === id ? { ...s, title: newName } : s)
    );
  };

  const handleDelete = (id: string) => {
    setSessions(prev => {
      const updated = prev.filter(s => s.id !== id);
      if (updated.length === 0) {
        const fresh = { id: crypto.randomUUID(), title: "New Chat", messages: [] };
        setCurrentSessionId(fresh.id);
        return [fresh];
      }
      if (id === currentSessionId) {
        setCurrentSessionId(updated[0].id);
      }
      return updated;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, 100);
  }, [currentSession.messages]);

  const handleSend = (msg: Tempmsg) => {
    const sig = `${currentSessionId}::${msg.content}`;
    const last = recentSendsRef.current.get(sig) ?? 0;
    const now = Date.now();
    if (now - last < 2000) return;
    recentSendsRef.current.set(sig, now);

    setSessions(prev =>
      prev.map(session =>
        session.id === currentSessionId
          ? {
              ...session,
              title: session.messages.length === 0
                ? msg.content.slice(0, 20) + "..."
                : session.title,
              messages: session.messages.length > 0 && 
                session.messages[session.messages.length - 1].content === msg.content
                ? session.messages
                : [...session.messages, msg]
            }
          : session
      )
    );
  };

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      <div className="w-72 bg-zinc-950/90 text-zinc-100 p-4 flex flex-col border-r border-zinc-800/50 backdrop-blur-md">
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold tracking-tight">J.A.R.V.I.S</h1>
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </motion.button>
          </div>

          <motion.button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 hover:border-orange-500/40 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
              <Plus className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-sm font-medium">New chat</span>
          </motion.button>
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 px-2">
          Your chats
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {sessions.map((session) => (
            <motion.div
              key={session.id}
              onClick={() => setCurrentSessionId(session.id)}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all relative ${
                session.id === currentSessionId
                  ? "bg-zinc-800/60 text-zinc-50 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
                  : "hover:bg-zinc-800/30 text-zinc-400"
              }`}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              {session.id === currentSessionId && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-500 rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="truncate max-w-[10rem] text-sm font-medium">
                {session.title}
              </div>
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); handleRename(session.id); }}
                  className="p-1.5 rounded-md hover:bg-zinc-700/50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-zinc-400" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(session.id); }}
                  className="p-1.5 rounded-md hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800/50">
          <div className="text-[10px] text-zinc-500 text-center">Powered by Cardano</div>
        </div>
      </div>

      <div className="flex flex-col flex-1 bg-gradient-to-b from-zinc-950 to-black h-screen overflow-hidden">
        <div className="flex-shrink-0 border-b border-zinc-800/50 backdrop-blur-xl bg-zinc-950/80">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30">
                <Sparkles className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-zinc-100">{currentSession.title}</h2>
                <p className="text-xs text-zinc-500">
                  {currentSession.messages.length} message{currentSession.messages.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <span className="text-xs text-zinc-400">AI Assistant Active</span>
            </div>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto min-h-0">
          {currentSession.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-md"
              >
                <div className="mb-6 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30">
                      <Sparkles className="w-10 h-10 text-orange-400" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-zinc-100 mb-3">Welcome to J.A.R.V.I.S</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                  Your AI-powered voice assistant for blockchain automation. Start a conversation to manage your tasks, execute smart contracts, and more.
                </p>
                <div className="grid grid-cols-1 gap-3 text-left">
                  {["J.A.R.V.I.S , Open my Wallet", "Hii !! Who are you ??", "Show my all transactions"].map((suggestion, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 hover:bg-zinc-900/80 transition-all text-sm text-zinc-300 text-left"
                      onClick={() => handleSend({ id: crypto.randomUUID(), role: "user", content: suggestion })}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <MessageList messages={currentSession.messages} />
          )}
        </div>

        <div className="flex-shrink-0 border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
          <div className="w-full flex justify-center py-6 px-4">
            <PromptInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}