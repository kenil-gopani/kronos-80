export default function CtaSection({ onCheckout }) {
  return (
    <section className="px-6 py-32 bg-engineering-base">
      <div className="reveal max-w-7xl mx-auto rounded-[3rem] border border-engineering-border bg-engineering-surface p-12 sm:p-20 relative overflow-hidden text-center shadow-2xl">
        <div className="absolute inset-0 engineering-grid-bg opacity-[0.03]"></div>
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-engineering-accent/10 blur-[120px]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] text-engineering-accent font-mono font-bold mb-6">System Ready</p>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight font-bold text-engineering-text leading-tight">Deploy your KRONOS.</h2>
          <p className="text-engineering-textMuted mt-8 text-xl leading-relaxed">Secure your unit today. Due to CNC machining times, batches are strictly limited and manufactured on demand.</p>
          
          <button onClick={onCheckout} className="inline-flex items-center gap-3 mt-12 rounded-2xl bg-engineering-text text-engineering-base px-10 py-5 font-bold text-lg hover:bg-engineering-accent transition-all duration-300 hover:shadow-[0_0_30px_rgba(105,167,255,0.4)] hover:scale-105 active:scale-95 group">
            Initialize Configuration 
            <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
