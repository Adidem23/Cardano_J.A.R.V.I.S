import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

/** allow TypeScript to know about window.cardano */
declare global {
  interface Window {
    cardano?: Record<string, any>;
  }
}

/** shorten address (bech32 or hex) for display */
const shorten = (addr: string | null, left = 8, right = 6) =>
  addr ? `${addr.slice(0, left)}…${addr.slice(-right)}` : null;

function WalletButton({
  onConnect,
  onDisconnect,
}: {
  onConnect: () => void;
  onDisconnect: () => void;
}) {
  const [detectedWallets, setDetectedWallets] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [displayAddr, setDisplayAddr] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detect = () => {
      setDetectedWallets(Object.keys(window.cardano || {}));
    };

    detect();
    setTimeout(detect, 300);
    setTimeout(detect, 1000);
  }, []);

  const connect = async () => {
    if (connecting) return;
    if (!window.cardano) return alert("No Cardano wallets detected.");

    setConnecting(true);

    const key =
      detectedWallets.find((k) => k.toLowerCase().includes("typhon")) ||
      detectedWallets[0];

    if (!key) {
      setConnecting(false);
      return alert("No compatible wallet found.");
    }

    try {
      const wallet = window.cardano[key];
      if (!wallet || typeof wallet.enable !== "function") {
        setConnecting(false);
        return alert(`Detected wallet "${key}" does not expose CIP-30 enable()`);
      }

      const api = await wallet.enable();

      // attempt to get an address via common getters; we will not convert hex to bech32
      let rawAddr: string | null = null;
      try {
        const used = (await api.getUsedAddresses?.()) || [];
        const unused = (await api.getUnusedAddresses?.()) || [];
        const change = (await api.getChangeAddress?.()) || null;

        if (used && used.length) rawAddr = used[0];
        else if (change) rawAddr = change;
        else if (unused && unused.length) rawAddr = unused[0];
      } catch (e) {
        // ignore — some wallets may not implement all getters
      }

      // If address looks bech32-like, keep it. If it's hex (not starting with addr/addr_test/stake),
      // do NOT try to convert — just show a shortened hex.
      const isBech32Like =
        typeof rawAddr === "string" &&
        (rawAddr.startsWith("addr") || rawAddr.startsWith("addr_test") || rawAddr.startsWith("stake"));

      const shown = isBech32Like ? shorten(rawAddr) : rawAddr ? shorten(rawAddr) : null;

      setDisplayAddr(shown);
      setConnected(true);
      onConnect();
    } catch (err: any) {
      console.error("Wallet connect error:", err);
      alert(err?.message || "Wallet connection failed.");
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setDisplayAddr(null);
    onDisconnect();
  };

  return (
    <div className="flex items-center gap-3">
      {!connected ? (
        // Black-themed connect button (matches navbar)
        <button
          onClick={connect}
          disabled={connecting}
          className="px-3 py-1 rounded-lg bg-black text-white hover:opacity-90"
        >
          {connecting ? "Connecting…" : "Connect Wallet"}
        </button>
      ) : (
        <>
          <div className="flex flex-col items-end">
            <div className="text-sm font-medium">Connected</div>
            <div className="text-xs text-gray-600">{displayAddr ?? "—"}</div>
          </div>

          <button
            onClick={disconnect}
            className="px-3 py-1 rounded-lg border hover:bg-gray-50"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export function Navbar({ show }: { show: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [walletConnected, setWalletConnected] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full flex justify-center pt-6 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* YOUR ORIGINAL NAVBAR THEME — UNCHANGED */}
      <nav className="
        flex w-full max-w-3xl items-center justify-between 
        rounded-full border border-zinc-200/70 bg-white/90 
        px-6 py-2 
        shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_24px_80px_rgba(0,0,0,0.55)]
        backdrop-blur-md 
        dark:border-white/10 dark:bg-zinc-950/80 
        dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.85)]
      ">
        <button
          className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => scrollToSection("hero")}
        >
          Jarvis
        </button>

        <div className="hidden items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:flex">
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => scrollToSection("hero")}>
            Home
          </button>
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => scrollToSection("features")}>
            About
          </button>
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => scrollToSection("testimonials")}>
            Testimonials
          </button>
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => scrollToSection("footer")}>
            Contact
          </button>
        </div>

        <div className="flex items-center gap-3">

          <WalletButton
            onConnect={() => setWalletConnected(true)}
            onDisconnect={() => setWalletConnected(false)}
          />

          {/* CHAT NOW visible ONLY when wallet is connected */}
          {walletConnected ? (
            <Button
              variant="outline"
              className="
                rounded-full border border-white/40 
                bg-zinc-950/70 px-6 py-5 
                text-[11px] font-semibold tracking-[0.22em] text-zinc-200 
                shadow-[0_0_0_1px_rgba(148,163,184,0.45),0_18px_60px_rgba(0,0,0,0.9)] 
                transition-all hover:bg-zinc-900/80 hover:text-zinc-50 
                dark:border-zinc-700/80
              "
              onClick={() => navigate("/chat")}
            >
              <span>CHAT NOW</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <div className="text-xs text-gray-500">Connect wallet to chat</div>
          )}

        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
