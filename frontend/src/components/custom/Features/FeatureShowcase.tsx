import { FEATURES } from "./data"
import { FeatureCard } from "@/components/custom/Features/FeatureCard"
import { FeatureBenefits } from "@/components/custom/Features/FeatureBenifits"
import { motion } from "motion/react"
import { ArrowUp } from "lucide-react"
import { TextEffect } from "@/components/motion-primitives/TextEffect"

const scrollReveal = {
  initial: { opacity: 0, y: 60 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

const levelUpVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.2
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export function FeatureShowcase() {
  return (
    <div className="w-full flex flex-col items-center px-4 py-32">
      <div className="w-full h-[25vh] flex items-start pt-[15vh]">
        <motion.div
          initial="initial"
          whileInView="animate"
          exit="exit"
          viewport={{ once: false, amount: 0.5 }}
          variants={levelUpVariants}
          className="w-full flex justify-start pl-[75%]"
          style={{ transform: 'translateX(-50%)' }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white/80 tracking-tight">
            <span className=" bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">.</span>Level Up
          </h1>
        </motion.div>
      </div>
      <div className="w-full min-h-[90%] flex px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-5xl font-light font-serif md:text-7xl lg:text-8xl xl:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-white/70 via-white/80 to-white/90 tracking-wider leading-tight"
        >
          Unlock The <br />Power Of Voice <br />Driven Automation
        </motion.h2>
      </div>

      <div className="w-full max-w-[70%] mt-20 space-y-24">
        {FEATURES.map((f, idx) => {
          const isImageRight = idx === 1
          
          return (
            <motion.div
              key={f.id}
              initial="initial"
              whileInView="animate"
              exit="exit"
              viewport={{ once: true, amount: 0.2, margin: "-50px" }}
              variants={scrollReveal}
              className="relative"
            >
              <div className="relative rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-8 lg:p-12 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 ${
                  isImageRight ? "" : "lg:grid-flow-dense"
                }`}>
                  <motion.div
                    className={`${isImageRight ? "lg:col-start-1" : "lg:col-start-2"}`}
                    variants={{
                      initial: { opacity: 0, x: isImageRight ? -40 : 40 },
                      animate: { 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          duration: 0.8,
                          delay: 0.2,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <h3 className="text-3xl lg:text-4xl font-medium text-white tracking-tight mb-6">
                        {f.title}
                      </h3>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="leading-relaxed text-lg text-neutral-400 mb-8"
                    >
                      {f.description}
                    </motion.p>
                    
                    <FeatureBenefits list={f.bullets} />
                  </motion.div>
                  <motion.div
                    className={`${isImageRight ? "lg:col-start-2" : "lg:col-start-1"}`}
                    variants={{
                      initial: { opacity: 0, x: isImageRight ? 40 : -40, scale: 0.95 },
                      animate: { 
                        opacity: 1, 
                        x: 0,
                        scale: 1,
                        transition: { 
                          duration: 0.8,
                          delay: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      }
                    }}
                  >
                    <FeatureCard index={idx} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}