import { useState, useEffect } from 'react'
import { useCustomCursor } from './hooks/useCustomCursor'
import { useScrollReveal } from './hooks/useScrollReveal'
import BootLoader from './components/BootLoader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TickerBanner from './components/TickerBanner'
import FeaturesSection from './components/FeaturesSection'
import ConfiguratorSection, { CONFIG_DATA } from './components/ConfiguratorSection'
import SpecsSection from './components/SpecsSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import VideoModal from './components/VideoModal'
import Toast from './components/Toast'
import CheckoutModal from './components/CheckoutModal'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [modalOpen, setModalOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [configState, setConfigState] = useState({ color: 'black', switch: 'linear' })

  useCustomCursor()
  useScrollReveal()

  useEffect(() => {
    const isLight = localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)
    setTheme(isLight ? 'light' : 'dark')
  }, [])

  useEffect(() => {
    if (theme === 'light') document.documentElement.classList.add('light')
    else document.documentElement.classList.remove('light')
    localStorage.theme = theme
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  const showToast = (msg) => setToastMsg(`${msg} ${Date.now()}`) // append timestamp to force re-render if same msg

  const buildString = `${CONFIG_DATA.colors[configState.color].name} · ${CONFIG_DATA.switches[configState.switch]}`

  return (
    <>
      <BootLoader />
      <CustomCursor />
      <Navbar theme={theme} onThemeToggle={toggleTheme} onDemoOpen={() => setModalOpen(true)} />
      
      <main>
        <HeroSection onDemoOpen={() => setModalOpen(true)} />
        <TickerBanner />
        <FeaturesSection />
        <ConfiguratorSection state={configState} setState={setConfigState} onToast={showToast} onCheckout={() => setCheckoutOpen(true)} />
        <SpecsSection currentSwitch={configState.switch} />
        <CtaSection onCheckout={() => setCheckoutOpen(true)} />
      </main>

      <Footer />
      <VideoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} configState={configState} />
      
      <Toast message={toastMsg ? toastMsg.replace(/ \d+$/, '') : ''} />
    </>
  )
}
