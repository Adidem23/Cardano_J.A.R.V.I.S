import { motion } from "motion/react"
import { FeatureFrame } from "./FeatureFrame"
import { hoverTilt } from "@/components/custom/Features/animation"

export function FeatureCard({
  delay = 0,
  index,
}: {
  delay?: number
  index: number
}) {
  return (
    <FeatureFrame delay={delay}>
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={hoverTilt}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full h-full aspect-square lg:aspect-video flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-64 h-40 bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl flex flex-col p-1 z-10">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
            <div className="flex gap-1.5">
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-red-500/40"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="w-20 h-1.5 bg-white/5 rounded-full ml-auto" />
          </div>

          <div className="flex-1 p-3 grid grid-cols-2 gap-3 relative">
            <motion.div 
              className="bg-orange-500/5 border border-orange-500/10 rounded group-hover:bg-orange-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="bg-purple-500/5 border border-purple-500/10 rounded group-hover:bg-purple-500/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div
          className="absolute pointer-events-none z-20"
          animate={{
            x: ["-20%", "30%", "-10%"],
            y: ["20%", "-10%", "10%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-5 h-5 text-orange-400 drop-shadow-[0_4px_12px_rgba(251,146,60,0.6)]"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ transform: "rotate(-25deg)" }}
          >
            <path d="M5.5 3.21l10.8 5.4a1 1 0 0 1 .16 1.7l-4.2 2.1 2.1 4.2a1 1 0 0 1-1.8.9l-2.1-4.2-4.2 2.1A1 1 0 0 1 4 12.91L5.69 1.8Z" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bg-neutral-800 border border-white/10 rounded-lg p-3 shadow-xl w-40 text-[11px] text-neutral-300"
          animate={{
            x: ["40%", "10%", "50%"],
            y: ["-20%", "10%", "-10%"],
            opacity: [0.7, 1, 0.85],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-500 font-bold text-[9px] text-black">
              LG
            </div>
            <span className="text-[9px] text-neutral-500">Live</span>
          </div>
          Need this more dynamic?
          <div className="absolute -bottom-1 left-4 w-3 h-3 bg-neutral-800 border-b border-l border-white/10 rotate-45" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-30">
        <div className="flex -space-x-2">
          <motion.div 
            className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-orange-500 flex items-center justify-center text-xs font-bold text-black"
            whileHover={{ scale: 1.1, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            S
          </motion.div>
          <motion.div 
            className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] bg-neutral-700 flex items-center justify-center text-xs font-bold text-white"
            whileHover={{ scale: 1.1, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            J
          </motion.div>
        </div>

        <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] uppercase tracking-wider font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          Live
        </div>
      </div>
    </FeatureFrame>
  )
}