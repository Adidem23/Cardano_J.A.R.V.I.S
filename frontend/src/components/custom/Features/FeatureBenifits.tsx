import { Check } from "lucide-react"
import { motion } from "motion/react"

export function FeatureBenefits({ list }: { list: string[] }) {
  return (
    <ul className="space-y-4">
      {list.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { 
              delay: 0.1 * i + 0.5, 
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            },
          }}
          viewport={{ once: false, amount: 0.8 }}
          className="flex items-center gap-3 text-sm text-neutral-300"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ 
              delay: 0.1 * i + 0.6,
              duration: 0.4,
              ease: "backOut"
            }}
            viewport={{ once: false }}
          >
            <Check className="w-4 h-4 text-orange-500" strokeWidth={2} />
          </motion.div>
          {item}
        </motion.li>
      ))}
    </ul>
  )
}