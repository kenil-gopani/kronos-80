import { useEffect, useState } from 'react'

export default function Toast({ message }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const t = setTimeout(() => setVisible(false), 3000)
      return () => clearTimeout(t)
    }
  }, [message])

  return (
    <div id="toast" className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] rounded-2xl bg-engineering-surface border border-engineering-border px-8 py-4 text-sm shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex items-center gap-4 transition-all duration-400 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <div className="w-2.5 h-2.5 rounded-full bg-engineering-accent animate-pulse shadow-[0_0_10px_#69a7ff]"></div>
      <span className="text-engineering-text font-display tracking-wide text-base">{message}</span>
    </div>
  )
}
