import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Minus } from "lucide-react";
import Spline from '@splinetool/react-spline'
import { useState } from 'react'
import { TextEffect } from "../motion-primitives/TextEffect";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import '@/components/customCSS/border-button.css'

interface ExpandableCardProps {
    title: string;
    description: string;
    isOpenByDefault: boolean;
    index: number;
}

const ExpandableCard = ({ title, description, isOpenByDefault, index }: ExpandableCardProps) => {
    const [isOpen, setIsOpen] = useState(isOpenByDefault);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 0.8, 0.35, 1] }}
            className={`rounded-lg transition-all duration-300 ${isOpen ? 'bg-zinc-900 p-4' : 'p-2'}`}
        >
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <h3 className="font-semibold text-lg">{title}</h3>
                <motion.button 
                    className="p-1"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </motion.button>
            </div>
            <motion.div
                initial={false}
                animate={{ 
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0 
                }}
                transition={{ duration: 0.3, ease: [0.22, 0.8, 0.35, 1] }}
                style={{ overflow: "hidden" }}
            >
                {isOpen && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
};

const CTA = () => {
    const containerRef = useRef(null);
    const leftColumnRef = useRef(null);
    const rightCardRef = useRef(null);
    const buttonRef = useRef(null);

    const isContainerInView = useInView(containerRef, { once: true, margin: "-100px" });
    const isLeftColumnInView = useInView(leftColumnRef, { once: true, margin: "-100px" });
    const isRightCardInView = useInView(rightCardRef, { once: true, margin: "-100px" });
    const isButtonInView = useInView(buttonRef, { once: true, margin: "-100px" });

    return (
        <div className="relative w-full flex min-h-screen flex-col items-center justify-center">
            <motion.div 
                ref={containerRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isContainerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.22, 0.8, 0.35, 1] }}
                className="flex w-[70vw] flex-col items-end bg-zinc-900/50 rounded-4xl p-10 space-y-10"
            >
                <div className="flex w-full flex-col items-end">
                    <div className="flex justify-row w-full gap-10">
                        <motion.div 
                            ref={leftColumnRef}
                            initial={{ opacity: 0, x: -50 }}
                            animate={isLeftColumnInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.8, 0.35, 1] }}
                            className=" w-[40%] flex flex-col justify-between h-[50vh]"
                        >
                            <div>
                                <TextEffect per="word" preset="blur" className=" text-4xl font-serif">From Voice Command to Autonomous Execution</TextEffect>
                                <motion.div
                                    ref={buttonRef}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isButtonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                >
                                    <Button 
                                        variant='link' 
                                        className=" underline font-light text-orange-400 group"
                                    >
                                        Explore Our Agent 
                                        <motion.span
                                            className="inline-block ml-1"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ArrowRight />
                                        </motion.span>
                                    </Button>
                                </motion.div>
                            </div>

                            <div className="space-y-4">
                                <ExpandableCard 
                                    title="Voice Recognition" 
                                    description="Advanced AI-powered voice recognition that understands natural language commands and executes complex blockchain transactions seamlessly."
                                    isOpenByDefault={true}
                                    index={0}
                                />
                                <ExpandableCard 
                                    title="Smart Contract Automation" 
                                    description="Automatically deploy and interact with smart contracts using simple voice commands, no coding required."
                                    isOpenByDefault={false}
                                    index={1}
                                />
                            </div>
                        </motion.div>
                        <motion.div 
                            ref={rightCardRef}
                            initial={{ opacity: 0, x: 50, rotateY: -15 }}
                            animate={isRightCardInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 50, rotateY: -15 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 0.8, 0.35, 1] }}
                            className=" h-[50vh] w-[35vw] rounded-4xl bg-zinc-900 flex flex-row"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className=" w-1/2 flex flex-col justify-end p-4">
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isRightCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className=" text-2xl font-serif mb-4"
                                >
                                    One Agent, Multiple Tasks—united by your voice.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isRightCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <Button 
                                        className=" shiny-cta mt-10 font-light"
                                        asChild
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(251, 146, 60, 0.3)" }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            Get Started
                                        </motion.button>
                                    </Button>
                                </motion.div>
                            </div>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isRightCardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 0.8, 0.35, 1] }}
                                className=" w-1/2 p-4"
                            >
                                <motion.div 
                                    className="border rounded-xl overflow-hidden h-full"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Spline
                                        scene="https://prod.spline.design/m0JX4ekxx-aJGxNG/scene.splinecode"
                                    />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default CTA