import { useEffect, useRef, useState } from 'react'

export default function Navbar({ theme, onThemeToggle, onDemoOpen }) {
  const [scrolled, setScrolled]   = useState(false)
  const [progress, setProgress]   = useState(0)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress((window.scrollY / max) * 100)
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#home',      label: 'Overview' },
    { href: '#features',  label: 'Architecture' },
    { href: '#configure', label: 'Configure' },
    { href: '#specs',     label: 'Data Sheet' },
  ]

  return (
    <header id="navbar" className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Scroll Progress */}
      <div id="progress" className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-engineering-accent to-blue-400 shadow-[0_0_8px_#69a7ff] transition-all duration-150 z-50" style={{ width: `${progress}%` }}></div>

      <nav className={`max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-engineering-surface/80 backdrop-blur-xl' : ''}`}>
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-engineering-surface2 grid place-items-center border border-engineering-border text-engineering-text font-display font-bold group-hover:border-engineering-accent/50 transition-colors">K</div>
          <span className="font-display font-bold tracking-wide text-engineering-text">KRONOS<span className="text-engineering-textMuted font-light">.80</span></span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-mono uppercase tracking-widest text-engineering-textMuted hover:text-engineering-accent transition-colors duration-200">{l.label}</a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button id="themeToggle" onClick={onThemeToggle} className="w-10 h-10 rounded-xl border border-engineering-border bg-engineering-surface2 flex items-center justify-center hover:border-engineering-accent/50 transition-all duration-300 text-engineering-textMuted hover:text-engineering-accent" aria-label="Toggle theme">
            {theme === 'light' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            )}
          </button>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="#configure" className="text-sm font-mono uppercase tracking-widest text-engineering-textMuted hover:text-engineering-accent transition-colors px-4 py-2">Configure</a>
            <button onClick={onDemoOpen} className="rounded-xl bg-engineering-accent/10 border border-engineering-accent/30 text-engineering-accent px-5 py-2.5 text-sm font-semibold hover:bg-engineering-accent hover:text-black transition-all duration-300">View Demo</button>
          </div>

          {/* Mobile Menu Toggle */}
          <button id="menuBtn" onClick={() => setMenuOpen(o => !o)} className="lg:hidden w-10 h-10 rounded-xl border border-engineering-border bg-engineering-surface2 flex items-center justify-center" aria-label="Menu">
            <svg className="w-5 h-5 text-engineering-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/></svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div id="mobileMenu" className={`lg:hidden border-t border-engineering-border bg-engineering-surface/95 backdrop-blur-xl ${menuOpen ? '' : 'hidden'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm font-mono uppercase tracking-widest text-engineering-textMuted hover:text-engineering-accent transition-colors py-2 border-b border-engineering-border/30">{l.label}</a>
          ))}
          <div className="h-px w-full bg-engineering-border my-2"></div>
          <button onClick={() => { onDemoOpen(); setMenuOpen(false) }} className="w-full rounded-xl bg-engineering-accent text-[#06080c] py-4 text-sm font-bold shadow-[0_0_15px_rgba(105,167,255,0.3)]">Deploy Unit - ₹24,999</button>
        </div>
      </div>
    </header>
  )
}
