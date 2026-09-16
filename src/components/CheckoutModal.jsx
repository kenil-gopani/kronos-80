import { useEffect, useState, useRef } from 'react'
import { CONFIG_DATA } from './ConfiguratorSection'

const LOGS = [
  { msg: "Initializing secure handshake...", icon: "🔗" },
  { msg: "RSA-4096 key exchanged.", icon: "🔐" },
  { msg: "Verifying payment signature...", icon: "✍️" },
  { msg: "Transaction authorized.", icon: "✅" },
  { msg: "Allocating inventory SKU...", icon: "📦" },
  { msg: "Generating manufacturing ticket...", icon: "🎫" },
  { msg: "Writing to ledger...", icon: "📝" },
  { msg: "Deploy sequence locked.", icon: "🚀" }
]

export default function CheckoutModal({ isOpen, onClose, configState }) {
  const [step, setStep] = useState('summary')
  const [logs, setLogs] = useState([])
  const [orderId, setOrderId] = useState('')
  const [formData, setFormData] = useState({ name: '', address: '' })
  const logsEndRef = useRef(null)

  const c = CONFIG_DATA.colors[configState.color]
  const sName = CONFIG_DATA.switches[configState.switch]
  const total = 24999 + c.price

  useEffect(() => {
    if (isOpen) {
      setStep('summary')
      setLogs([])
      setOrderId(`ORD-KRO-${Math.floor(Math.random() * 90000) + 10000}X`)
      setFormData({ name: '', address: '' })
    }
  }, [isOpen])

  useEffect(() => {
    if (step === 'processing') {
      let currentLog = 0
      const delays = [300, 500, 700, 400, 600, 800, 500, 400]
      function pushLog() {
        if (currentLog < LOGS.length) {
          const l = LOGS[currentLog]
          setLogs(prev => [...prev, { text: `[SYS] ${l.msg}`, icon: l.icon }])
          const delay = delays[currentLog] || 500
          currentLog++
          setTimeout(pushLog, delay)
        } else {
          setTimeout(() => setStep('success'), 900)
        }
      }
      const t = setTimeout(pushLog, 600)
      return () => clearTimeout(t)
    }
  }, [step])

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  const handleClose = () => {
    if (step === 'processing') return
    onClose()
  }

  const downloadPdf = async () => {
    const now = new Date()
    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.left = '-9999px'
    container.style.top = '0'
    container.innerHTML = `
      <div style="background:#000;color:#fff;font-family:Arial,Helvetica,sans-serif;padding:40px 50px;width:595px;min-height:842px;">
        <div style="text-align:center;padding-bottom:30px;border-bottom:1px solid rgba(255,255,255,0.08);">
          <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#fff;">KRO<span style="color:#69a7ff;">NOS</span>.80</div>
          <div style="color:#888;font-size:10px;letter-spacing:5px;text-transform:uppercase;margin-top:8px;">Manufacturing Ticket</div>
        </div>

        <div style="text-align:center;padding:30px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
          <div style="display:inline-block;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.4);color:#22c55e;padding:6px 18px;border-radius:99px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">✓ ORDER CONFIRMED</div>
          <div style="font-size:32px;font-weight:700;letter-spacing:8px;color:#69a7ff;margin-top:16px;">${orderId}</div>
          <div style="margin:16px auto 0;width:200px;height:36px;background:repeating-linear-gradient(90deg,#fff 0px,#fff 3px,transparent 3px,transparent 5px,#fff 5px,#fff 7px,transparent 7px,transparent 11px,#fff 11px,#fff 15px,transparent 15px,transparent 17px);opacity:0.25;"></div>
        </div>

        <div style="padding:24px 0;">
          <div style="display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:3px;">Date</span><span style="color:#fff;font-weight:600;font-size:14px;">${now.toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</span></div>
          <div style="display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:3px;">Customer</span><span style="color:#fff;font-weight:600;font-size:14px;">${formData.name}</span></div>
          <div style="display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:3px;">Ship To</span><span style="color:#fff;font-weight:600;font-size:14px;text-align:right;max-width:260px;">${formData.address}</span></div>
          <div style="display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:3px;">Build</span><span style="color:#fff;font-weight:600;font-size:14px;">${c.name} &middot; ${sName}</span></div>
          <div style="display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:3px;">Payment</span><span style="color:#fff;font-weight:600;font-size:14px;">Cash on Delivery</span></div>
          <div style="display:flex;justify-content:space-between;padding:24px 0 16px;border-top:2px solid rgba(105,167,255,0.25);margin-top:10px;"><span style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:3px;">Total</span><span style="color:#69a7ff;font-weight:700;font-size:28px;">&#x20B9;${total.toLocaleString('en-IN')}</span></div>
        </div>

        <div style="text-align:center;padding-top:30px;border-top:1px solid rgba(255,255,255,0.06);margin-top:auto;">
          <div style="color:#69a7ff;font-size:13px;letter-spacing:2px;font-weight:600;">Helpline: +91 1800-576-6680</div>
          <div style="color:#555;font-size:10px;letter-spacing:1px;margin-top:6px;">support@kronos80.in &middot; Mon-Sat 9AM - 8PM IST</div>
          <div style="color:#333;font-size:9px;letter-spacing:3px;text-transform:uppercase;margin-top:14px;">Thank you for deploying KRONOS &middot; ${now.getFullYear()}</div>
        </div>
      </div>`
    document.body.appendChild(container)
    const { default: html2pdf } = await import('html2pdf.js')
    await html2pdf().set({
      margin: 0,
      filename: `KRONOS-Receipt-${orderId}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, backgroundColor: '#000000', useCORS: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    }).from(container.firstElementChild).save()
    document.body.removeChild(container)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 transition-opacity duration-500">
      <div className={`relative w-full max-w-2xl rounded-[2rem] border border-engineering-border bg-engineering-surface shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-700 ${step === 'success' ? 'border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.15)]' : ''}`}>
        
        {step === 'processing' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-engineering-accent animate-pulse shadow-[0_0_20px_#69a7ff]"></div>}
        {step === 'success' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-green-500 shadow-[0_0_20px_#22c55e]"></div>}

        <div className="p-8 sm:p-12 relative z-10">
          
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] font-mono text-engineering-textMuted uppercase tracking-[0.2em] mb-1">
                {step === 'summary' && 'Transaction Pending'}
                {step === 'processing' && 'System Processing'}
                {step === 'success' && 'Transaction Complete'}
              </p>
              <h3 className="font-display text-3xl font-bold tracking-tight text-engineering-text">
                {step === 'summary' && 'Review Deployment'}
                {step === 'processing' && 'Authenticating...'}
                {step === 'success' && 'Unit Deployed.'}
              </h3>
            </div>
            {step !== 'processing' && (
              <button onClick={handleClose} className="w-10 h-10 rounded-full bg-engineering-surface2 border border-engineering-border flex items-center justify-center hover:bg-engineering-accent hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            )}
          </div>

          {/* STEP 1: SUMMARY & FORM */}
          {step === 'summary' && (
            <div className="space-y-8 animate-fade-in">
              <div className="rounded-2xl border border-engineering-border bg-engineering-surface2 p-6 flex gap-6 items-center">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${c.swatch} border border-white/10 flex-shrink-0 shadow-inner`}></div>
                <div>
                  <b className="font-display text-xl block text-engineering-text">{c.name} Build</b>
                  <p className="text-engineering-textMuted font-mono text-sm mt-1">{sName} Module</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-display text-lg tracking-wide text-engineering-text">Shipping Manifest</h4>
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-engineering-surface2 border border-engineering-border rounded-xl px-4 py-3 text-engineering-text outline-none focus:border-engineering-accent transition-colors shadow-inner" />
                <textarea placeholder="Delivery Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-engineering-surface2 border border-engineering-border rounded-xl px-4 py-3 text-engineering-text outline-none focus:border-engineering-accent transition-colors shadow-inner h-24 resize-none"></textarea>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-engineering-border bg-engineering-surface2/50 text-engineering-textMuted text-sm">
                  <div className="w-4 h-4 rounded-full border-4 border-engineering-accent"></div>
                  <span>Payment Method: <b>Cash on Delivery</b></span>
                </div>
              </div>

              <div className="border-t border-engineering-border pt-6 flex justify-between items-end">
                <span className="font-mono text-xs text-engineering-textMuted uppercase tracking-widest">Total Authorized</span>
                <span className="font-display text-3xl text-engineering-accent font-bold">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button 
                onClick={() => { if (formData.name && formData.address) setStep('processing') }} 
                disabled={!formData.name || !formData.address}
                className="w-full relative group overflow-hidden rounded-xl bg-engineering-text text-engineering-base py-5 font-bold transition-transform active:scale-95 text-lg shadow-[0_10px_20px_rgba(0,0,0,0.3)] disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  Confirm Deployment
                </span>
                <div className="absolute inset-0 bg-engineering-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          )}

          {/* STEP 2: PROCESSING */}
          {step === 'processing' && (
            <div className="space-y-6 animate-fade-in">
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-engineering-surface2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-engineering-accent to-blue-400 rounded-full shadow-[0_0_10px_#69a7ff] transition-all duration-700 ease-out" style={{ width: `${(logs.length / LOGS.length) * 100}%` }}></div>
              </div>
              <div className="rounded-2xl border border-engineering-border bg-[#020305] p-6 h-64 overflow-y-auto font-mono text-xs sm:text-sm text-engineering-accent relative shadow-inner">
                <div className="space-y-4 relative z-10">
                  {logs.map((log, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-0" style={{ animation: 'fade-in 0.5s ease forwards', animationDelay: `${i * 50}ms` }}>
                      <span className="text-base leading-none mt-0.5 flex-shrink-0">{log.icon}</span>
                      <div>
                        <span className="text-engineering-textMuted/60 text-[10px] block mb-0.5">{new Date().toISOString().split('T')[1].slice(0,-5)}</span>
                        <span className="text-engineering-accent/90">{log.text}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={logsEndRef} className="h-4 flex items-center">
                    <span className="w-2 h-5 bg-engineering-accent/80 animate-pulse rounded-sm"></span>
                  </div>
                </div>
              </div>
              <p className="text-center text-engineering-textMuted text-xs font-mono animate-pulse">Securing transaction — do not close this window</p>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <div className="animate-fade-in text-center">
              <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
              </div>
              
              <div className="inline-block border border-engineering-border bg-engineering-surface2 rounded-2xl p-6 text-left mb-8 w-full max-w-sm">
                <p className="text-[10px] font-mono text-engineering-textMuted uppercase tracking-widest mb-1">Manufacturing Ticket</p>
                <b className="font-display text-2xl tracking-widest text-engineering-text">{orderId}</b>
                <div className="mt-4 h-12 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiIHg9IjAiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIiB4PSI4Ii8+PHJlY3Qgd2lkdGg9IjYiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZiIgeD0iMTQiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIiB4PSIyNCIvPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiIHg9IjI4Ii8+PHJlY3Qgd2lkdGg9IjIiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZiIgeD0iNDAiLz48cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIiB4PSI0NCIvPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiIHg9IjUyIi8+PHJlY3Qgd2lkdGg9IjYiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZiIgeD0iNTYiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIiB4PSI2NiIvPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiIHg9IjcxIi8+PHJlY3Qgd2lkdGg9IjIiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZiIgeD0iNzgiLz48cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIiB4PSI4NCIvPjwvc3ZnPg==')] opacity-50 mix-blend-screen" style={{backgroundSize: '100px 100%', backgroundRepeat: 'repeat-x'}}></div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={downloadPdf} className="w-full rounded-xl bg-engineering-accent text-black py-4 font-bold hover:shadow-[0_0_25px_rgba(105,167,255,0.4)] transition-all duration-300 flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download Receipt (PDF)
                </button>
                <button onClick={handleClose} className="w-full rounded-xl border border-engineering-border bg-engineering-surface2 py-4 font-bold text-engineering-text hover:bg-engineering-text hover:text-black transition-all duration-300">
                  Acknowledge & Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
