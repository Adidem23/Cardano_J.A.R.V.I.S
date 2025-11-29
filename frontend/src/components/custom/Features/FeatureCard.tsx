import { motion } from "motion/react"
import {
  KeyRound,
  Cpu,
  Users,
  MousePointer2,
  Zap,
} from "lucide-react"
import { FeatureFrame } from "./FeatureFrame"

type FeatureCardProps = {
  delay?: number
  index: number
}

export function FeatureCard({ delay = 0, index }: FeatureCardProps) {
  return (
    <FeatureFrame delay={delay}>
      <div className="relative aspect-square w-full lg:aspect-video flex items-center justify-center p-4">
        {index === 0 && <SecureVisual />}
        {index === 1 && <MultiplayerVisual />}
        {index === 2 && <ProductionVisual />}
      </div>
    </FeatureFrame>
  )
}

function SecureVisual() {
  return (
    <div className="relative w-full max-w-lg rounded-3xl border border-orange-500/30 bg-black/80 px-5 pt-5 pb-6 shadow-[0_0_40px_rgba(249,115,22,0.15),0_0_80px_rgba(249,115,22,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500/80" />
          <span className="h-2 w-2 rounded-full bg-amber-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </div>
        <div className="h-1.5 w-16 rounded-full bg-zinc-800" />
      </div>

      <div className="mt-4 grid grid-cols-[1.1fr_minmax(0,1fr)] gap-4">
        <div className="relative h-28 rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500/15 via-black to-black overflow-hidden">
          <div className="absolute inset-3 flex flex-col justify-between text-[10px] text-orange-100/80">
            <div className="flex items-center justify-between uppercase tracking-[0.2em]">
              <span className="text-orange-300">Signing Layer</span>
              <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[9px] text-orange-100">
                Isolated
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="h-1 w-6 rounded-full bg-orange-400/80" />
                  <span className="h-1 w-10 rounded-full bg-orange-500/70" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1 w-5 rounded-full bg-orange-300/70" />
                  <span className="h-1 w-7 rounded-full bg-orange-500/50" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 text-[9px] text-orange-100/80">
                <span>Keys locked</span>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-orange-300">
                  <KeyRound className="h-3 w-3" />
                  0 leaks
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex h-28 flex-col rounded-2xl border border-white/10 bg-zinc-900/80 px-4 py-3 overflow-hidden">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 via-transparent to-transparent opacity-20" />
          <div className="relative flex items-center justify-between text-[10px] mb-3">
            <span className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-zinc-300">
              Audit Log
            </span>
            <span className="text-[9px] text-zinc-500">
              Encrypted · Verifiable
            </span>
          </div>
          <div className="relative flex flex-col justify-center flex-1 space-y-2.5 text-[10px] text-zinc-300">
            <div className="flex items-center justify-between">
              <span>tx_0xf8c2…ab9</span>
              <span className="text-[9px] text-emerald-400">✓ Signed</span>
            </div>
            <div className="flex items-center justify-between">
              <span>tx_0x9bd1…413</span>
              <span className="text-[9px] text-emerald-400">✓ Logged</span>
            </div>
            <div className="flex items-center justify-between">
              <span>access.audit.json</span>
              <span className="text-[9px] text-amber-300">Tamper-proof</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-black">
            S
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-xs font-semibold text-white">
            J
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-orange-500/50 bg-orange-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-orange-200">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          Live
        </div>
      </div>
    </div>
  )
}

function MultiplayerVisual() {
  return (
    <motion.div
      className="relative w-full max-w-xl rounded-3xl border border-purple-500/30 bg-black/80 px-5 py-4 shadow-[0_0_40px_rgba(168,85,247,0.15),0_0_80px_rgba(168,85,247,0.1)]"
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.75, ease: [0.22, 0.8, 0.35, 1] }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </div>
        <div className="h-1.5 w-16 rounded-full bg-zinc-800" />
      </div>

      <div className="mt-5 grid grid-cols-[1.05fr_minmax(0,1fr)] gap-4">
        <div className="relative h-28 rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden">
          <div className="absolute inset-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-orange-500/25 bg-orange-500/10" />
            <div className="rounded-xl border border-purple-500/25 bg-purple-500/10" />
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80" />
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80" />
          </div>

          <motion.div
            className="pointer-events-none absolute left-10 top-6"
            animate={{
              x: [0, 18, 40, 18, 0],
              y: [0, 10, 0, -6, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MousePointer2 className="h-5 w-5 text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.7)]" />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute right-10 top-10"
            animate={{
              x: [0, -16, -32, -16, 0],
              y: [0, -8, 0, 6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <MousePointer2 className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
          </motion.div>
        </div>

        <div className="relative flex h-28 flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/90 px-4 py-3">
          <div className="flex items-center justify-between text-[10px]">
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[9px] uppercase tracking-[0.22em] text-zinc-300">
              Session
            </span>
            <span className="flex items-center gap-1 text-[9px] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
          <div className="space-y-1 text-[11px] text-zinc-300">
            <div className="flex items-center justify-between">
              <span>State synced</span>
              <span className="text-[9px] text-emerald-400">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2 cursors, 1 space</span>
              <span className="text-[9px] text-zinc-500">Realtime</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-4 flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-zinc-900/95 px-3 py-2 text-[11px] text-zinc-200"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
          <Users className="h-3.5 w-3.5 text-orange-400" />
          <span>Shared space</span>
        </div>
        <p className="leading-snug text-[11px]">
          "Can we move this signer tile to the left?"
        </p>
      </motion.div>
    </motion.div>
  )
}

function ProductionVisual() {
  const progressItems = [
    { label: "Complex Mesh", reduction: "-82%", finalWidth: "82%" },
    { label: "Static Props", reduction: "-78%", finalWidth: "78%" },
  ]

  return (
    <motion.div
      className="relative w-full max-w-lg rounded-3xl border border-sky-500/30 bg-black/80 px-5 pt-4 pb-5 shadow-[0_0_40px_rgba(56,189,248,0.15),0_0_80px_rgba(56,189,248,0.1)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 0.8, 0.35, 1] }}
    >
      <div className="flex items-center justify-between text-[9px] text-zinc-500">
        <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] text-zinc-300">
          Build → Optimize → Ship
        </span>
        <span className="flex items-center gap-1">
          <Zap className="h-3 w-3 text-sky-400" />
          <span>Flux Engine</span>
        </span>
      </div>

      <div className="mt-3 grid grid-cols-[1.1fr_minmax(0,1fr)] gap-3">
        <div className="relative h-20 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-3 py-2.5">
          <div className="flex items-center justify-between text-[9px] text-zinc-400">
            <span>Geometry</span>
            <span className="rounded-full bg-zinc-900 px-1.5 py-0.5 text-[8px] text-zinc-300">
              Instanced
            </span>
          </div>
          <div className="mt-2.5 space-y-2">
            {progressItems.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center justify-between text-[9px]"
              >
                <span className="text-zinc-400">{item.label}</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-14 overflow-hidden rounded-full bg-zinc-800">
                    <motion.span
                      className="block h-full rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]"
                      initial={{ width: "0%" }}
                      animate={{
                        width: [
                          "0%",
                          item.finalWidth,
                          `${parseInt(item.finalWidth) - 5}%`,
                          item.finalWidth
                        ]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.4,
                        repeat: Infinity,
                        repeatDelay: 2.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </span>
                  <span className="text-[8px] text-zinc-500">{item.reduction}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-20 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-3 py-2.5">
          <div className="flex items-center justify-between text-[9px] text-zinc-400">
            <span>Runtime</span>
            <span className="text-[8px] text-emerald-400">
              Ready
            </span>
          </div>
          <div className="mt-2.5 space-y-1.5 text-[9px] text-zinc-300">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
            >
              <span>FPS</span>
              <span className="text-emerald-400">120</span>
            </motion.div>
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
            >
              <span>Payload</span>
              <span className="text-zinc-400">-85%</span>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-3 flex w-full items-center justify-between rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-sky-200"
        animate={{
          boxShadow: [
            "0 0 0 rgba(56,189,248,0)",
            "0 0 22px rgba(56,189,248,0.5)",
            "0 0 0 rgba(56,189,248,0)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="flex items-center gap-2">
          <Cpu className="h-3 w-3" />
          Auto optimized
        </span>
        <span className="text-[8px] text-sky-100/80">Zero downtime</span>
      </motion.div>
    </motion.div>
  )
}