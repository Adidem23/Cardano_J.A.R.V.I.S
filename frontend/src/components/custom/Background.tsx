import Video from '@/assets/BgVideo.mp4'
import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function Background({ onAnimationComplete }: { onAnimationComplete?: () => void }) {
    const [scrolled, setScrolled] = useState(false)
    const [animationComplete, setAnimationComplete] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.8)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (animationComplete && videoRef.current) {
            videoRef.current.play()
            onAnimationComplete?.()
        }
    }, [animationComplete, onAnimationComplete])

    const tileGradients = [30, 45, 60, 75, 60, 45, 30]

    return (
        <div className='fixed inset-0 w-full h-full -z-10'>
            <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 brightness-50 ${scrolled ? 'opacity-20' : 'opacity-100'
                    }`}
                src={Video}
                muted
                loop
                playsInline
                aria-hidden="true"
            />
            <div className="absolute inset-0 w-full h-screen grid grid-cols-7 gap-0 pointer-events-none z-10">
                {tileGradients.map((percentage, index) => (
                    <Tile
                        key={index}
                        greyPercentage={percentage}
                        onComplete={index === tileGradients.length - 1 ? () => setAnimationComplete(true) : undefined}
                    />
                ))}
            </div>
        </div>
    )
}

function Tile({ greyPercentage, onComplete }: { greyPercentage: number; onComplete?: () => void }) {
    const height = useMotionValue(0)

    useEffect(() => {
        const controls = animate(height, greyPercentage, {
            duration: 1.5,
            ease: "easeOut",
            onComplete: onComplete
        })

        return controls.stop
    }, [greyPercentage, height, onComplete])

    return (
        <motion.div className="h-full border-r border-[0.1px] border-gray-700/30 transition-colors relative">
            <motion.div
                className="absolute left-0 right-0 border-t border-b border-[0.1px] border-gray-700/30"
                style={{
                    background: `linear-gradient(to bottom, rgba(128, 128, 128, 0.3), rgba(128, 128, 128, 0.1))`,
                    height: useTransform(height, (value) => `${value}%`)
                }}
            />
        </motion.div>
    )
}