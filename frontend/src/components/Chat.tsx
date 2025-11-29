import { useState, useRef } from "react";
import ChatImage from "../assets/chat6.jpeg";
import RenameImage from "../assets/rename.jpeg";
import DeleteImage from "../assets/Delete.jpeg";
import MessageList from "./MessageList";
import PromptInput from "./PromptInput";

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


  // Send Tempmsg + Auto Assistant Reply
  const handleSend = (msg: Tempmsg) => {
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
      {/* <div className="w-72 bg-sidebar text-sidebar-foreground p-4 space-y-4 border-r border-sidebar-border flex flex-col "> */}





      <div className="w-72 bg-[#111113] text-gray-200 p-4 flex flex-col border-r border-gray-800">

        {/* TOP ITEMS */}
        <div className="space-y-1 mb-4">
          <div>
            <h1 className="text-lg font-semibold">J.A.R.V.I.S</h1>
          </div>

          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#ffffff10] transition"
          >
            <img src={ChatImage} alt="new chat" className="w-6 h-6 rounded-sm object-cover" />
            <span className="text-sm">New chat</span>
          </button>







        </div>

        {/* DIVIDER */}
        <div className="text-xs text-gray-400 mt-2 mb-1 px-2">
          Your chats
        </div>

        {/* CHAT LIST */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">

          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setCurrentSessionId(session.id)}
              className={`
          group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer
          transition relative
          ${session.id === currentSessionId
                  ? "bg-[#ffffff10] text-white border-l-2 border-white/80"
                  : "hover:bg-[#ffffff10]"
                }
        `}
            >
              {/* Chat title */}
              <div className="truncate max-w-[10rem] text-sm">
                {session.title}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRename(session.id);
                  }}
                  className="text-xs hover:text-white"
                >
                  <img src={RenameImage} alt="rename" className="w-5 h-5 rounded-sm object-cover" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(session.id);
                  }}
                  className="text-xs hover:text-red-400"
                >
                  <img src={DeleteImage} alt="delete" className="w-5 h-5 rounded-sm object-cover" />
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
