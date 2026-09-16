export default function Footer() {
  return (
    <footer className="border-t border-engineering-border bg-[#020305] py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] engineering-grid-bg"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center pb-10 border-b border-engineering-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-engineering-surface2 grid place-items-center border border-engineering-border text-engineering-text font-display font-bold">K</div>
            <b className="font-display text-engineering-text tracking-wide text-lg">KRONOS<span className="text-engineering-textMuted font-light">.80</span></b>
          </div>
          
          <div className="flex gap-10 font-mono text-sm uppercase tracking-widest text-engineering-textMuted">
            <a href="#" className="hover:text-engineering-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-engineering-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-engineering-accent transition-colors">Support</a>
          </div>
        </div>
        <div className="pt-10 flex justify-between items-center text-xs font-mono text-engineering-textMuted/50 uppercase tracking-widest">
          <span>© 2026 KRONOS Inc.</span>
          <span>SYS_VER 2.0.4</span>
        </div>
      </div>
    </footer>
  )
}
