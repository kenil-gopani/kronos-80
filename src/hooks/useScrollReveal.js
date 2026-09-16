import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    function animateCounter(counter) {
      const target = +counter.getAttribute('data-target')
      const duration = 2200
      const step = target / (duration / 16)
      let current = 0
      const update = () => {
        current += step
        if (current < target) {
          counter.innerText = Math.ceil(current)
          requestAnimationFrame(update)
        } else {
          counter.innerText = target
        }
      }
      update()
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          entry.target.querySelectorAll('.counter').forEach(c => animateCounter(c))
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    els.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
