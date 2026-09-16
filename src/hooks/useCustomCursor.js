import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor')
    const cursorRing = document.getElementById('cursor-ring')
    if (!cursor || !cursorRing) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let cursorVisible = false
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!cursorVisible) {
        cursorVisible = true
        document.body.classList.add('hide-native-cursor')
        cursor.style.opacity = '1'
        cursorRing.style.opacity = '1'
      }
    }
    const onLeave = () => { cursor.style.opacity = '0'; cursorRing.style.opacity = '0' }
    const onEnter = () => { if (cursorVisible) { cursor.style.opacity = '1'; cursorRing.style.opacity = '1' } }
    const onDown  = () => document.body.classList.add('cursor-clicking')
    const onUp    = () => document.body.classList.remove('cursor-clicking')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    function animate() {
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      ringX += (mouseX - ringX) * 0.14
      ringY += (mouseY - ringY) * 0.14
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    // Hover state
    const addHover = () => document.querySelectorAll('a, button, [data-color], [data-switch], .config-option, .feature-card, .stat-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
    })
    const timer = setTimeout(addHover, 500)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
    }
  }, [])
}
