const CONFIG_DATA = {
  colors: {
    black:  { name: 'Obsidian', code: 'OB-1000', price: 0,    img: '/black key.png', glow: 'bg-blue-500/20',   swatch: 'from-zinc-700 to-black' },
    silver: { name: 'Titanium', code: 'TI-1000', price: 1000, img: '/silver.png',    glow: 'bg-gray-400/20',   swatch: 'from-gray-200 to-gray-500' },
    copper: { name: 'Copper',   code: 'CU-1000', price: 1500, img: '/copper.png',    glow: 'bg-orange-500/20', swatch: 'from-orange-300 to-amber-700' },
  },
  switches: { linear: 'Silent Linear', tactile: 'Tactile' },
}

export { CONFIG_DATA }

export default function ConfiguratorSection({ state, setState, onToast, onCheckout }) {
  const c     = CONFIG_DATA.colors[state.color]
  const sName = CONFIG_DATA.switches[state.switch]
  const total = 24999 + c.price

  const setColor = (color) => {
    if (state.color !== color) {
      setState(s => ({ ...s, color }))
      onToast(`Asset loaded: ${CONFIG_DATA.colors[color].name} finish`)
    }
  }
  const setSwitch = (sw) => {
    if (state.switch !== sw) {
      setState(s => ({ ...s, switch: sw }))
      onToast(`Module swapped: ${CONFIG_DATA.switches[sw]}`)
    }
  }

  return (
    <section id="configure" className="bg-engineering-base border-b border-engineering-border py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] engineering-grid-bg"></div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 text-[20vw] font-display font-bold text-white/[0.01] pointer-events-none select-none whitespace-nowrap">BUILD_SYS</div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-engineering-accent font-semibold font-mono">02 / System Builder</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-4 tracking-tight font-bold glitch-hover" data-text="Configure Array.">Configure Array.</h2>
          <p className="text-engineering-textMuted mt-4 text-xl">Define parameters. Real-time visual feedback initialized.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mt-16 items-center">
          {/* Configurator Panel */}
          <div className="lg:col-span-5 reveal rounded-[2rem] border border-engineering-border bg-engineering-surface p-8 sm:p-10 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-engineering-accent/30 rounded-tl-[2rem]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-engineering-accent/30 rounded-br-[2rem]"></div>

            {/* Color */}
            <div className="mb-12 relative z-10">
              <div className="mb-6">
                <h3 className="font-display text-2xl tracking-wide font-bold">Chassis Alloy</h3>
                <p className="text-sm text-engineering-textMuted mt-1">Machined housing finish</p>
              </div>
              <div id="colors" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(CONFIG_DATA.colors).map(([key, val]) => (
                  <button key={key} data-color={key} onClick={() => setColor(key)}
                    className={`config-option border-2 rounded-2xl p-5 text-left transition-all duration-300 relative overflow-hidden group ${state.color === key ? 'border-engineering-accent bg-engineering-accent/5 shadow-[0_0_15px_rgba(105,167,255,0.15)]' : 'border-engineering-border bg-engineering-surface2 hover:border-engineering-accent/50 hover:bg-engineering-surface'}`}>
                    <span className={`block w-10 h-10 rounded-full bg-gradient-to-br ${val.swatch} mb-4 border border-white/20 shadow-inner group-hover:scale-110 transition-transform`}></span>
                    <b className="text-base text-engineering-text block font-display tracking-wide">{val.name}</b>
                    <small className="block text-engineering-textMuted mt-1 font-mono text-[10px] uppercase tracking-widest">{val.price ? `+₹${val.price.toLocaleString('en-IN')}` : 'Included'}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Switch */}
            <div className="mb-12 relative z-10">
              <div className="mb-6">
                <h3 className="font-display text-2xl tracking-wide font-bold">Actuation Module</h3>
                <p className="text-sm text-engineering-textMuted mt-1">Mechanical switch selection</p>
              </div>
              <div id="switches" className="grid grid-cols-2 gap-2 mt-4 p-2 rounded-2xl bg-engineering-base border border-engineering-border relative">
                <div className="switch-highlighter absolute inset-y-2 left-2 w-[calc(50%-8px)] bg-engineering-accent rounded-xl transition-all duration-300 shadow-[0_0_10px_rgba(105,167,255,0.4)] z-0"
                  style={{ transform: state.switch === 'linear' ? 'translateX(0)' : 'translateX(100%)' }}></div>
                {['linear', 'tactile'].map(sw => (
                  <button key={sw} data-switch={sw} onClick={() => setSwitch(sw)}
                    className={`switch-btn relative z-10 px-4 py-4 text-sm font-bold transition-colors duration-300 ${state.switch === sw ? 'text-engineering-base' : 'text-engineering-textMuted hover:text-engineering-text'}`}>
                    {CONFIG_DATA.switches[sw]}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t border-engineering-border pt-8 flex justify-between items-end relative z-10">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-[0.2em] text-engineering-textMuted mb-2">Build Manifest</p>
                <b id="summary" className="block text-engineering-text font-display text-xl tracking-wide">{c.name} · {sName}</b>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-mono tracking-[0.2em] text-engineering-textMuted mb-2">Estimated Total</p>
                <b id="price" className="font-display text-3xl text-engineering-accent">₹{total.toLocaleString('en-IN')}</b>
              </div>
            </div>

            <button onClick={onCheckout} className="w-full mt-10 relative group overflow-hidden rounded-xl bg-engineering-text text-engineering-base py-5 font-bold transition-transform active:scale-95 text-lg shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Compile Order
                <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </span>
              <div className="absolute inset-0 bg-engineering-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-7 reveal delay-1 min-h-[400px] sm:min-h-[500px] flex items-center justify-center relative w-full h-full">
            <div id="preview" className="w-full relative z-10 group h-full flex flex-col justify-center">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-3xl transition-colors duration-500 opacity-60 ${c.glow}`} id="previewGlow"></div>
              <div className="relative overflow-hidden rounded-[2rem] border-2 border-engineering-border bg-engineering-surface shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] aspect-[4/3] group-hover:border-engineering-accent/40 transition-colors duration-500">
                <img id="previewProductPhoto" src={c.img} alt="Live Preview" className="block w-full h-full object-cover transition-opacity duration-500 ease-in-out"/>
                <div id="previewLoading" className="absolute inset-0 bg-engineering-surface/80 backdrop-blur-sm grid place-items-center opacity-0 pointer-events-none transition-opacity duration-300">
                  <div className="w-10 h-10 border-4 border-engineering-accent/20 border-t-engineering-accent rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-engineering-accent/10"></div>
                  <div className="absolute top-0 left-1/2 w-px h-full bg-engineering-accent/10"></div>
                  <div className="w-full h-24 bg-gradient-to-b from-transparent via-engineering-accent/10 to-transparent shadow-[0_0_15px_#69a7ff_inset] opacity-50 animate-scan"></div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                <div className="rounded-xl border border-engineering-border/50 bg-engineering-surface2/90 px-4 py-3 backdrop-blur-xl flex items-center gap-3 shadow-xl">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-engineering-textMuted font-mono uppercase tracking-[0.2em] leading-none mb-1">Status</span>
                    <b id="previewCode" className="font-display tracking-widest text-engineering-text text-sm leading-none">{c.code}</b>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="px-2 py-1 bg-engineering-surface2/80 backdrop-blur-md rounded border border-engineering-border/50 text-[9px] font-mono text-engineering-accent uppercase tracking-widest">Live Render Engine</div>
                  <div className="px-2 py-1 bg-engineering-surface2/80 backdrop-blur-md rounded border border-engineering-border/50 text-[9px] font-mono text-engineering-textMuted uppercase tracking-widest">Asset: HQ_PROD_1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
