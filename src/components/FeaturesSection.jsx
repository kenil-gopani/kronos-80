import { useEffect } from 'react'

const features = [
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>,
    title: 'Acoustic Isolation',
    desc: 'Poron foam dampening combined with isolating silicone gasket mounting eliminates metallic ping and harsh bottom-outs.',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>,
    title: 'Sub-1ms Latency',
    desc: 'Custom MCU architecture and 1000Hz polling rate ensures keystrokes are registered and transmitted with zero perceptible delay.',
    delay: 'delay-1',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>,
    title: 'Hot-Swap PCB',
    desc: 'Kailh sockets support 3-pin and 5-pin mechanical switches natively, allowing complete customization without soldering.',
    delay: 'delay-2',
  },
]

export default function FeaturesSection() {
  useEffect(() => {
    document.querySelectorAll('.spotlight-card').forEach(card => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px')
        card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px')
      }
      card.addEventListener('mousemove', onMove)
      return () => card.removeEventListener('mousemove', onMove)
    })
  }, [])

  return (
    <section id="features" className="py-32 relative bg-engineering-surface z-10 border-y border-engineering-border/50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="reveal text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-engineering-accent"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-engineering-accent font-mono font-bold">01 / Architecture</p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-engineering-accent"></div>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight font-bold glitch-hover" data-text="Engineered for Purpose.">Engineered for Purpose.</h2>
          <p className="text-engineering-textMuted mt-6 text-lg sm:text-xl leading-relaxed">No superficial elements. Every component is mathematically placed to optimize acoustic resonance and tactile feedback.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <article key={i} className={`feature-card spotlight-card reveal ${f.delay || ''} rounded-3xl border border-engineering-border bg-engineering-base p-10 relative overflow-hidden group hover:border-engineering-accent/40 transition-colors duration-500 shadow-xl`}>
              <div className="absolute inset-0 bg-gradient-to-br from-engineering-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-engineering-surface2 border border-engineering-border grid place-items-center mb-10 overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-engineering-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <svg className="w-8 h-8 text-engineering-accent relative z-10 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">{f.icon}</svg>
              </div>
              <h3 className="font-display text-2xl text-engineering-text mb-4 tracking-wide font-bold">{f.title}</h3>
              <p className="text-engineering-textMuted text-base leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-engineering-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
