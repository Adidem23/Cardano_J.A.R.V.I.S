import './App.css'
import { ReactLenis } from 'lenis/react'
import { ThemeProvider } from '@/components/theme-provider'
import { LandingPage } from '@/pages/LandingPage'
import Chat from './components/Chat'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function LandingPageWithLenis() {
  return (
    <ReactLenis root options={{ lerp: 0.05, syncTouch: true }}>
      <LandingPage />
    </ReactLenis>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageWithLenis />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App