import Video from '@/assets/BgVideo.mp4'
import { useEffect, useState, useRef } from 'react'

export default function Background({ 
    onAnimationComplete,
    onTileAnimationComplete 
}: { 
    onAnimationComplete?: () => void;
    onTileAnimationComplete?: () => void;
}) {
    const [scrolled, setScrolled] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const hasStarted = useRef(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight * 0.8)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Wait for tile animation to complete (2 seconds)
        const tileTimer = setTimeout(() => {
            onTileAnimationComplete?.()
            
            // Then start video after a small delay
            const videoTimer = setTimeout(() => {
                if (videoRef.current && !hasStarted.current) {
                    hasStarted.current = true
                    videoRef.current.play()
                    
                    // Trigger content animation after video starts
                    setTimeout(() => {
                        onAnimationComplete?.()
                    }, 300)
                }
            }, 300)

            return () => clearTimeout(videoTimer)
        }, 2000)

        return () => clearTimeout(tileTimer)
    }, [onAnimationComplete, onTileAnimationComplete])

    return (
        <div className='fixed inset-0 w-full h-full -z-10'>
            <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 brightness-60 ${
                    scrolled ? 'opacity-40' : 'opacity-100'
                }`}
                src={Video}
                muted
                loop
                playsInline
                aria-hidden="true"
            />
        </div>
    )
}