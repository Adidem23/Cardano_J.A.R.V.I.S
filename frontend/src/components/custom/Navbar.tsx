import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"

export function Navbar({ show }: { show: boolean }) {
  const navigate = useNavigate()
  const location = useLocation()

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

  return (
    <motion.header
      className="sticky top-0 z-50 w-full flex justify-center pt-6 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <nav className="flex w-full max-w-3xl items-center justify-between rounded-full border border-zinc-200/70 bg-white/90 px-6 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/80 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.85)]">
        <button 
          className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => scrollToSection('hero')}
        >
          Jarvis
        </button>
        <div className="hidden items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:flex">
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => scrollToSection('hero')}>
            Home
          </button>
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => scrollToSection('features')}>
            About
          </button>
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => scrollToSection('testimonials')}>
            Testimonials
          </button>
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100" onClick={() => scrollToSection('footer')}>
            Contact
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">
            Connect Wallet
          </button>
          <Button
            variant="outline"
            className="rounded-full border border-white/40 bg-zinc-950/70 px-6 py-5 text-[11px] font-semibold tracking-[0.22em] text-zinc-200 shadow-[0_0_0_1px_rgba(148,163,184,0.45),0_18px_60px_rgba(0,0,0,0.9)] transition-all hover:bg-zinc-900/80 hover:text-zinc-50 dark:border-zinc-700/80"
            onClick={() => navigate('/chat')}
          >
            <span className="">CHAT NOW</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}