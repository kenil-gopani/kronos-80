import { useEffect, useRef, useState } from 'react'
import { useParticleCanvas } from '../hooks/useParticleCanvas'

export default function HeroSection({ onDemoOpen }) {
  const tiltRef = useRef(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const photos = [
    { src: '/black key.png', name: 'Obsidian' },
    { src: '/silver.png', name: 'Titanium' },
    { src: '/copper.png', name: 'Copper' }
  ]
  useParticleCanvas('particle-canvas')

  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex(prev => (prev + 1) % photos.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // 3D Tilt Card
  useEffect(() => {
    const card = tiltRef.current
    if (!card) return
    const INTENSITY = 12
    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      card.style.transform = `perspective(800px) rotateY(${dx * INTENSITY}deg) rotateX(${-dy * INTENSITY}deg) scale3d(1.03,1.03,1.03)`
      const shine = card.querySelector('.tilt-shine')
      if (shine) shine.style.background = `radial-gradient(circle at ${dx * 50 + 50}% ${dy * 50 + 50}%, rgba(255,255,255,0.14) 0%, transparent 65%)`
    }
    const onLeave = () => { card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)' }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])

  // Magnetic buttons
  useEffect(() => {
    const btns = document.querySelectorAll('.magnetic')
    btns.forEach(btn => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect()
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.35
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.35
        btn.style.transform = `translate(${dx}px, ${dy}px)`
      }
      const onLeave = () => { btn.style.transform = 'translate(0,0)' }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
    })
  }, [])

  // Data Rain
  useEffect(() => {
    const dataRain = document.getElementById('data-rain')
    if (!dataRain || dataRain.children.length > 0) return
    const COLS = 14
    const DATA_CHARS = '01ABCDEFabcdefXYZ!@#$%^&'
    for (let i = 0; i < COLS; i++) {
      const col = document.createElement('div')
      col.className = 'data-stream-col'
      col.style.left = (i * (100 / COLS) + Math.random() * 4) + 'vw'
      col.style.animationDuration = (Math.random() * 8 + 6).toFixed(1) + 's'
      col.style.animationDelay    = '-' + (Math.random() * 10).toFixed(1) + 's'
      let content = ''
      for (let j = 0; j < 40; j++) content += DATA_CHARS[Math.floor(Math.random() * DATA_CHARS.length)] + '\n'
      col.textContent = content
      dataRain.appendChild(col)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen pt-[72px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 engineering-grid-bg animate-grid-move"></div>
        <div className="absolute inset-0 hero-glow mix-blend-screen"></div>
        <canvas id="particle-canvas"></canvas>
        <div className="data-stream-container" id="data-rain"></div>
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 15vw 20vh H 25vw V 45vh H 45vw" fill="none" stroke="currentColor" className="text-engineering-accent animate-draw-line" strokeWidth="1.5" strokeDasharray="1000" strokeDashoffset="1000"/>
          <path d="M 80vw 60vh H 70vw V 30vh H 55vw" fill="none" stroke="currentColor" className="text-blue-500 animate-draw-line" style={{animationDelay:'1.5s'}} strokeWidth="1" strokeDasharray="1000" strokeDashoffset="1000"/>
          <circle cx="25vw" cy="45vh" r="3" className="fill-engineering-accent opacity-0 animate-fade-in" style={{animationDelay:'3s'}}/>
          <circle cx="70vw" cy="30vh" r="3" className="fill-blue-500 opacity-0 animate-fade-in" style={{animationDelay:'4.5s'}}/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center py-20">
        {/* Left: Text */}
        <div className="hero-content lg:col-span-6 z-20">
          <div className="reveal inline-flex items-center gap-3 px-4 py-2 rounded-full border border-engineering-accent/30 bg-engineering-accent/10 text-engineering-accent text-xs font-mono font-semibold tracking-widest shadow-[0_0_20px_rgba(105,167,255,0.15)] backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-engineering-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-engineering-accent"></span>
            </span>
            Precision Machined
          </div>

          <h1 id="hero-heading" className="reveal mt-8 font-display text-5xl sm:text-[5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight font-bold text-engineering-text glitch-hover" data-text="Engineered for Perfection.">
            Engineered for<br/>
            <span id="scramble-target" className="text-transparent bg-clip-text bg-gradient-to-r from-engineering-text via-engineering-textMuted to-engineering-surface2">Perfection.</span>
          </h1>

          <p className="reveal mt-6 max-w-lg text-engineering-textMuted text-lg sm:text-xl leading-relaxed">
            <b className="text-engineering-text font-medium">KRONOS 80</b> represents the pinnacle of typing hardware. CNC-machined 6061-T6 aluminum, acoustics-dampened architecture, and ultra-low latency telemetry.
          </p>

          <div className="reveal mt-12 flex flex-col sm:flex-row gap-5">
            <a href="#configure" className="magnetic group relative overflow-hidden rounded-xl bg-engineering-text text-engineering-base px-8 py-4 font-bold text-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center gap-3">
              <span className="relative z-10 flex items-center gap-2">
                Initialize Build
                <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </span>
            </a>
            <button id="demoBtn" onClick={onDemoOpen} className="group rounded-xl border border-engineering-border bg-engineering-surface/50 px-8 py-4 font-semibold hover:bg-engineering-surface2 transition-all duration-300 backdrop-blur-xl flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full bg-engineering-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-3.5 h-3.5 text-engineering-accent translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              View Schematic
            </button>
          </div>

          {/* Stats */}
          <div className="reveal mt-16 grid grid-cols-3 max-w-lg border-t border-engineering-border pt-8 gap-6 relative">
            <div className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-engineering-accent to-transparent"></div>
            <div className="stat-card group cursor-default">
              <b className="font-display text-3xl text-engineering-text group-hover:text-engineering-accent transition-colors">80<span className="text-xl text-engineering-textMuted">%</span></b>
              <p className="text-[10px] text-engineering-textMuted mt-2 font-mono uppercase tracking-[0.2em]">Form Factor</p>
            </div>
            <div className="stat-card group cursor-default">
              <b className="font-display text-3xl text-engineering-text group-hover:text-engineering-accent transition-colors counter" data-target="1000">0</b>
              <span className="font-display text-xl text-engineering-textMuted">Hz</span>
              <p className="text-[10px] text-engineering-textMuted mt-2 font-mono uppercase tracking-[0.2em]">Telemetry</p>
            </div>
            <div className="stat-card group cursor-default">
              <b className="font-display text-3xl text-engineering-text group-hover:text-engineering-accent transition-colors counter" data-target="80">0</b>
              <span className="font-display text-xl text-engineering-textMuted">h</span>
              <p className="text-[10px] text-engineering-textMuted mt-2 font-mono uppercase tracking-[0.2em]">Power Cell</p>
            </div>
          </div>
        </div>

        {/* Right: Keyboard Video Card */}
        <div className="hero-keyboard reveal relative h-[450px] sm:h-[600px] flex items-center justify-center lg:justify-end lg:col-span-6 z-10">
          <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-engineering-accent/20 blur-[120px] animate-pulse-slow"></div>

          <div id="keyboard-tilt" ref={tiltRef} className="keyboard-container tilt-card relative w-full max-w-[700px] lg:translate-x-12">
            <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-br from-engineering-accent/40 via-transparent to-transparent blur-xl opacity-60"></div>
            <div className="relative overflow-hidden rounded-[2rem] border border-engineering-border bg-engineering-surface shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] p-2">
              <div className="tilt-shine"></div>
              <div className="relative group rounded-[1.5rem] overflow-hidden bg-black aspect-[4/3] flex items-center justify-center">
                {photos.map((photo, i) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    alt={photo.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === photoIndex ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDBMMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')] pointer-events-none mix-blend-overlay"></div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-engineering-accent/70"></div>
                  <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-engineering-accent/70"></div>
                  <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-engineering-accent/70"></div>
                  <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-engineering-accent/70"></div>
                </div>
              </div>
            </div>
            {/* Floating HUD */}
            <div className="absolute -bottom-8 -left-4 sm:-left-12 rounded-2xl border border-engineering-border bg-engineering-surface2/95 p-5 backdrop-blur-2xl shadow-2xl animate-float">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                <p className="text-[10px] text-engineering-textMuted uppercase tracking-[0.15em] font-mono">System Active</p>
              </div>
              <b id="heroBuild" className="font-display text-base tracking-wide text-engineering-text">{photos[photoIndex].name} Module</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
