import './App.css'
import { ReactLenis } from 'lenis/react'
import { ThemeProvider } from '@/components/theme-provider'
import { LandingPage } from '@/pages/LandingPage'
import Chat from './components/Chat'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReactLenis root options={
        {
          lerp: 0.05,
          syncTouch: true,
        }
      }>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </ReactLenis>
    </ThemeProvider>
  )
}

export default App
