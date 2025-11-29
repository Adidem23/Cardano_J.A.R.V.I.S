import { TextRoll } from "@/components/motion-primitives/TextRoll";
import { Button } from "@/components/ui/button";
import '@/components/customCSS/border-button.css'
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero({ show }: { show: boolean }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.div 
            className="flex flex-col items-center mt-30 h-screen font-sans"
            variants={containerVariants}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
        >
            <motion.div 
                variants={itemVariants}
                className="px-6 py-2 rounded-full flex items-center gap-3 
                    bg-white/5 backdrop-blur-md border border-white/10
                    transition-colors duration-200 cursor-pointer 
                    hover:text-white/80 text-zinc-400"
            >
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span className="text-sm tracking-wide">
                    Welcome to JARVIS
                </span>
            </motion.div>

            <motion.span 
                variants={itemVariants}
                className="max-w-4xl text-center font-Thin tracking-tight lg:text-8xl md:text-6xl sm:text-4xl"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 opacity-70">
                    Automate Your <br />
                </span>
                <TextRoll
                    className="bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/30 opacity-70"
                    activeClassName="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-400 to-orange-400"
                    duration={0.5}
                    repeat={Infinity}
                >
                    Digital Tasks
                </TextRoll>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 opacity-60">
                    {" "}With Voice Commands.
                </span>
            </motion.span>

            <motion.span 
                variants={itemVariants}
                className="text-2xl mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl text-center"
            >
                Your voice becomes the ultimate productivity tool. Give simple commands to manage tasks, control apps, and streamline your entire workflow faster than ever.
            </motion.span>

            <motion.div variants={itemVariants}>
                <Button className="shiny-cta mt-10 font-light">
                    START JARVIS <ArrowRight/>
                </Button>
            </motion.div>
        </motion.div>
    )
}