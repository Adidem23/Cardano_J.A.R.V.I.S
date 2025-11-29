import Background from "@/components/custom/Background"
import CTA from "@/components/custom/CTA"
import { FeatureShowcase } from "@/components/custom/Features/FeatureShowcase"
import { Footer } from "@/components/custom/Footer"
import Hero from "@/components/custom/Hero"
import { Navbar } from "@/components/custom/Navbar"
import { Testimonials } from "@/components/custom/Testimonials"
import { useState, useEffect } from "react"

export const LandingPage = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [showHero, setShowHero] = useState(false)
  const [showTiles, setShowTiles] = useState(true)

  const handleTileAnimationComplete = () => {
    
  }

  const handleBackgroundComplete = () => {
    setTimeout(() => {
      setShowNavbar(true)
      setTimeout(() => {
        setShowHero(true)
      }, 300)
    }, 200)
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowTiles(window.scrollY <= window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative">
      <Background 
        onAnimationComplete={handleBackgroundComplete}
        onTileAnimationComplete={handleTileAnimationComplete}
      />
      <Navbar show={showNavbar} />
      <Hero show={showHero} showTiles={showTiles} />
      <FeatureShowcase/>
      <Testimonials/>
      <CTA/>
      <Footer/>
    </div>
  )
}