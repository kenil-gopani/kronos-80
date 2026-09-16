import { useEffect, useRef, useState } from 'react'

export default function VideoModal({ isOpen, onClose }) {
  const iframeRef = useRef(null)
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true)
    }
  }, [isOpen, hasOpened])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (iframeRef.current) {
      if (isOpen) {
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      } else {
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      }
    }
  }, [isOpen])

  return (
    <div className={`fixed inset-0 z-[110] bg-black/90 backdrop-blur-2xl grid place-items-center p-5 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`modal-card max-w-5xl w-full rounded-[2rem] border border-engineering-border bg-engineering-surface p-4 transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <div className="flex justify-end p-2 mb-2">
          <button onClick={onClose} className="w-12 h-12 rounded-full border border-engineering-border bg-engineering-surface2 hover:bg-engineering-accent hover:text-black hover:border-engineering-accent flex items-center justify-center transition-all duration-300 text-engineering-textMuted group">
            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="aspect-video w-full rounded-2xl border border-engineering-border bg-[#020305] relative overflow-hidden shadow-2xl flex items-center justify-center">
          {hasOpened && (
            <iframe ref={iframeRef} className="w-full h-full rounded-2xl" src="https://www.youtube-nocookie.com/embed/7XxgUwfEfXA?rel=0&modestbranding=1&enablejsapi=1&autoplay=1" title="Keyboard Commercial" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          )}
        </div>
      </div>
    </div>
  )
}
