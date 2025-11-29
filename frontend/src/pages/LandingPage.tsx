import Background from "@/components/custom/Background"
import Hero from "@/components/custom/Hero"
import { Navbar } from "@/components/custom/Navbar"
import { useState } from "react"

export const LandingPage = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [showHero, setShowHero] = useState(false)

  const handleBackgroundComplete = () => {
    setTimeout(() => {
      setShowNavbar(true)
      setTimeout(() => {
        setShowHero(true)
      }, 300)
    }, 200)
  }

  return (
    <div className="relative">
      <Background onAnimationComplete={handleBackgroundComplete} />
      <Navbar show={showNavbar} />
      <Hero show={showHero} />
    </div>
  )
}