import { motion } from "motion/react"
import { useState } from "react"
import { Mic, Brain, Workflow, CheckCircle } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true })
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const maskStyle = {
    WebkitMaskImage:
      "linear-gradient(180deg, transparent, black 0%, black 55%, transparent)",
    maskImage:
      "linear-gradient(180deg, transparent, black 0%, black 55%, transparent)",
  }

  return (
    <footer className="overflow-hidden bg-[#050505] text-white pt-24">
      <div className="relative mb-20 w-full px-4 text-center" style={maskStyle}>
        <div
          className="relative inline-block"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(194, 65, 12, 0.4) 0%, rgba(194, 65, 12, 0.2) 30%, transparent 70%)",
              left: mousePosition.x - 200,
              top: mousePosition.y - 200,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          <motion.h1
            className="relative p-4 select-none font-bold tracking-tighter text-[22vw] leading-[0.7] text-[#3b3b3b] mix-blend-screen scale-y-110"
            initial={{ opacity: 0, y: 40, scale: 1.02 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 0.8, 0.35, 1] }}
          >
            JARVIS
          </motion.h1>
        </div>
      </div>

      <div className="grid grid-cols-1 border-t border-neutral-900/50 lg:grid-cols-2">
        <motion.div
          className="relative grid grid-cols-2 gap-12 border-neutral-900/50 p-8 md:p-16 lg:border-r backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.35, 1] }}
        >
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-[radial-gradient(ellipse_at_top,rgba(194,65,12,0.15)_0%,rgba(194,65,12,0.08)_40%,transparent_70%)] blur-xl" />

          <div className="flex flex-col gap-6">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white text-left"
            >
              About Us
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white text-left"
            >
              Join Now
            </button>
          </div>
          <div className="flex flex-col gap-6">
            <button 
              onClick={() => scrollToSection('footer')}
              className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white text-left"
            >
              Contact Us
            </button>
            <a className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white">
              Instagram
            </a>
            <a className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white">
              Twitter/X
            </a>
            <a className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white">
              Facebook
            </a>
          </div>
        </motion.div>

        <motion.div
          className="aether-bottles relative flex h-48 w-full items-center justify-center overflow-hidden border-t border-neutral-900/50 lg:h-auto lg:border-t-0 backdrop-blur-sm"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.35, 1], delay: 0.1 }}
        >
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-[radial-gradient(ellipse_at_top,rgba(194,65,12,0.15)_0%,rgba(194,65,12,0.08)_40%,transparent_70%)] blur-xl" />

          <div className="relative flex w-full max-w-xl flex-col gap-8 px-10 py-8">
            <div className="flex items-end justify-between gap-10">
              <div className="flex h-32 flex-1 items-end gap-1.5">
                {[0.9,1.35,0.7,1.6,1.1,1.45,0.8,1.2].map((scale,i)=>(
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-gradient-to-t from-zinc-800/50 via-orange-500/70 to-amber-300/80"
                    style={{ transformOrigin:"center bottom"}}
                    animate={{ scaleY:[0.3,scale,0.4], opacity:[0.4,1,0.6] }}
                    transition={{ duration:1.8+i*0.1, repeat:Infinity, repeatType:"mirror", ease:"easeInOut", delay:i*0.05 }}
                  />
                ))}
              </div>
              <div className="flex flex-col items-end gap-2 text-right">
                <span className="text-[10px] uppercase tracking-[0.25em] text-orange-400">
                  Live Intents
                </span>
                <p className="text-xs text-neutral-400">
                  Every waveform is a voice command routed into automated tasks.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-3">
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
              <div className="relative flex w-full items-center justify-between">
                {[
                  { icon: Mic, label: "Voice", color: "text-orange-400" },
                  { icon: Brain, label: "Process", color: "text-purple-400" },
                  { icon: Workflow, label: "Execute", color: "text-blue-400" },
                  { icon: CheckCircle, label: "Complete", color: "text-emerald-400" },
                ].map((node, i) => (
                  <div key={node.label} className="flex flex-1 items-center">
                    <motion.div
                      className="flex flex-col items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 0.8, 0.35, 1] }}
                    >
                      <motion.div
                        className={`relative ${node.color}`}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <node.icon className="h-6 w-6" strokeWidth={1.5} />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-current opacity-20 blur-xl"
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.2, 0.4, 0.2]
                          }}
                          transition={{ 
                            duration: 2 + i * 0.3, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: i * 0.3
                          }}
                        />
                      </motion.div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                        {node.label}
                      </span>
                    </motion.div>
                    {i < 3 && (
                      <div className="relative h-[1px] flex-1 overflow-hidden">
                        <motion.div
                          className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: i * 0.5
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-span-1 flex flex-col items-center justify-between gap-6 border-t border-neutral-900/50 px-8 py-8 text-[10px] font-medium tracking-wide text-neutral-600 md:flex-row md:px-16 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 0.8, 0.35, 1], delay: 0.15 }}
        >
          <div>2025 All rights reserved, Cardano Hack</div>
          <div className="flex gap-8">
            <a className="transition-colors hover:text-white">Privacy Policy</a>
            <a className="transition-colors hover:text-white">Terms of use</a>
            <a className="transition-colors hover:text-white">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}