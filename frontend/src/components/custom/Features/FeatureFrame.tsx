
import { motion } from "motion/react"
import { scrollReveal } from "@/components/custom/Features/animation"

export function FeatureFrame({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={scrollReveal}
      transition={{ delay }}
      className="relative overflow-hidden bg-[#0A0A0A] border border-white/10 rounded-2xl backdrop-blur-lg"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />
      {children}
    </motion.div>
  )
}