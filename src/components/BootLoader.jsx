import { useEffect, useRef } from 'react'

export default function BootLoader() {
  const barRef  = useRef(null)
  const textRef = useRef(null)
  const loaderRef = useRef(null)

  useEffect(() => {
    const messages = [
      'Initializing System...',
      'Loading KRONOS Firmware...',
      'Calibrating Acoustics...',
      'Mounting Hardware Layer...',
      'Boot Sequence Complete.'
    ]
    let msgIndex = 0
    const bar  = barRef.current
    const text = textRef.current
    const loader = loaderRef.current
    if (!bar || !text || !loader) return

    requestAnimationFrame(() => { bar.style.width = '100%' })

    const msgInterval = setInterval(() => {
      msgIndex++
      if (msgIndex < messages.length) {
        text.textContent = messages[msgIndex]
      } else {
        clearInterval(msgInterval)
      }
    }, 340)

    const timer = setTimeout(() => {
      loader.classList.add('hidden')
      const scrambleTarget = document.getElementById('scramble-target')
      if (scrambleTarget) startScramble(scrambleTarget, 'Perfection.')
    }, 1900)

    function startScramble(el, finalText, duration = 1000) {
      const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\|{}[]'
      let frame = 0
      const totalFrames = Math.round(duration / 40)
      const update = () => {
        const progress = frame / totalFrames
        const resolvedCount = Math.floor(progress * finalText.length)
        let display = ''
        for (let i = 0; i < finalText.length; i++) {
          if (finalText[i] === ' ') { display += ' '; continue }
          display += i < resolvedCount ? finalText[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        el.textContent = display
        frame++
        if (frame <= totalFrames) requestAnimationFrame(update)
        else el.textContent = finalText
      }
      requestAnimationFrame(update)
    }

    return () => { clearInterval(msgInterval); clearTimeout(timer) }
  }, [])

  return (
    <div id="boot-loader" ref={loaderRef}>
      <div className="boot-lines"></div>
      <div className="boot-logo">KRO<span>NOS</span></div>
      <div className="boot-bar-wrapper">
        <div className="boot-bar" ref={barRef}></div>
      </div>
      <div className="boot-text" ref={textRef}>Initializing System...</div>
    </div>
  )
}
