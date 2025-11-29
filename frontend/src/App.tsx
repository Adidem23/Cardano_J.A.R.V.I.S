import './App.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LandingPage } from '@/pages/LandingPage'
import Chat from './components/Chat'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <LandingPage />
      
        
        <Chat />
    

    
    </ThemeProvider>
  )
}

export default App
