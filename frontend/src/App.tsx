import './App.css'
import { ReactLenis } from 'lenis/react'
import { ThemeProvider } from '@/components/theme-provider'
import { LandingPage } from '@/pages/LandingPage'
import Chat from './components/Chat'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReactLenis root options={
        {
          lerp: 0.05,
          syncTouch: true,
        }
      }>
        <LandingPage />
        {/* <Chat /> */}
      </ReactLenis>
    </ThemeProvider>
  )
}

export default App
