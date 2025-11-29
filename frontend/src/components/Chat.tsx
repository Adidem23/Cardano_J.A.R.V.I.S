import { useState, useRef } from "react";
import MessageList from "./MessageList";
import PromptInput from "./PromptInput";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
};

export default function Chat() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: crypto.randomUUID(), title: "New Chat", messages: [] }
  ]);

  // Prevent rapid duplicate sends: record recent (sessionId:content) signatures
  const recentSendsRef = useRef<Map<string, number>>(new Map());

  const [currentSessionId, setCurrentSessionId] = useState(sessions[0].id);
  const currentSession = sessions.find(s => s.id === currentSessionId)!;

  // Create New Chat
  const handleNewChat = () => {
    const newSession = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: []
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
  };

  // Rename Chat
  const handleRename = (id: string) => {
    const newName = prompt("Enter new chat name:");
    if (!newName) return;

    setSessions(prev =>
      prev.map(s =>
        s.id === id ? { ...s, title: newName } : s
      )
    );
  };

  // Delete Chat
  const handleDelete = (id: string) => {
  setSessions(prev => {
    const updated = prev.filter(s => s.id !== id);

    // If no sessions left → create a new one
    if (updated.length === 0) {
      const fresh = {
        id: crypto.randomUUID(),
        title: "New Chat",
        messages: []
      };
      setCurrentSessionId(fresh.id);
      return [fresh];
    }

    // If deleting the currently open chat → switch to the first remaining
    if (id === currentSessionId) {
      setCurrentSessionId(updated[0].id);
    }

    return updated;
  });
};


  // Send Message + Auto Assistant Reply
  const handleSend = (msg: Message) => {
    // Duplicate guard: skip if same content sent for this session within 2s
    const sig = `${currentSessionId}::${msg.content}`;
    const last = recentSendsRef.current.get(sig) ?? 0;
    const now = Date.now();
    if (now - last < 2000) {
      return; // ignore duplicate
    }
    recentSendsRef.current.set(sig, now);

    // Add user message (avoid duplicates)
    setSessions(prev =>
      prev.map(session =>
        session.id === currentSessionId
          ? {
              ...session,
              title:
                session.messages.length === 0
                  ? msg.content.slice(0, 20) + "..."
                  : session.title,
              messages:
                session.messages.length > 0 && session.messages[session.messages.length - 1].content === msg.content
                  ? session.messages
                  : [...session.messages, msg]
            }
          : session
      )
    );

    // Fake assistant reply
    setTimeout(() => {
      setSessions(prev =>
        prev.map(session =>
          session.id === currentSessionId
            ? {
                ...session,
                messages:
                  session.messages.length > 0 && session.messages[session.messages.length - 1].role === "assistant" && session.messages[session.messages.length - 1].content === `You said: ${msg.content}`
                    ? session.messages
                    : [
                        ...session.messages,
                        {
                          id: crypto.randomUUID(),
                          role: "assistant",
                          content: `You said: ${msg.content}`
                        }
                      ]
              }
            : session
        )
      );
    }, 300);
  };

  return (
    <div className="flex h-screen">

      {/* LEFT SIDEBAR */}
      <div className="w-72 bg-sidebar text-sidebar-foreground p-4 space-y-4 border-r border-sidebar-border flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-semibold">Harox</h1>
            <p className="text-xs text-sidebar-accent-foreground">Your assistant</p>
          </div>
          <button
            onClick={handleNewChat}
            className="inline-flex items-center gap-2 bg-sidebar-primary text-sidebar-primary-foreground px-3 py-1.5 rounded-md"
          >
            + New
          </button>
        </div>

        <div className="mb-3">
          <input
            type="search"
            placeholder="Search chats..."
            className="w-full bg-sidebar-border/30 placeholder:text-sidebar-accent-foreground px-3 py-2 rounded-md text-sm outline-none"
            onChange={() => {}}
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setCurrentSessionId(session.id)}
              className={`group p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all duration-150 ${
                session.id === currentSessionId
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow"
                  : "hover:bg-sidebar-accent/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-sidebar-accent flex items-center justify-center text-sm">💬</div>
                <div className="text-sm truncate max-w-[10rem]">{session.title}</div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRename(session.id);
                  }}
                  title="Rename chat"
                  className="text-xs px-2 rounded bg-transparent hover:bg-sidebar-border/40"
                >
                  ✏️
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(session.id);
                  }}
                  title="Delete chat"
                  className="text-xs px-2 rounded bg-transparent hover:bg-red-600/60"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — CHAT WINDOW */}
      <div className="flex flex-col flex-1 bg-[#0F1116]">

        {/* MESSAGE LIST */}
        <div className="flex-1 overflow-y-auto">
          <MessageList messages={currentSession.messages} />
        </div>

  {/* INPUT BAR */}
<div className="w-full flex justify-center pb-4 px-4">
  <PromptInput onSend={handleSend} />
</div>


      </div>
    </div>
  );
}
