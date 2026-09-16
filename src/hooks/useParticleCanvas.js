import { useEffect } from 'react'

export function useParticleCanvas(canvasId) {
  useEffect(() => {
    const canvas = document.getElementById(canvasId)
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    const PARTICLE_COUNT = 55
    let rafId

    function resizeCanvas() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x     = Math.random() * canvas.width
        this.y     = Math.random() * canvas.height
        this.r     = Math.random() * 1.5 + 0.3
        this.vx    = (Math.random() - 0.5) * 0.4
        this.vy    = (Math.random() - 0.5) * 0.4
        this.alpha = Math.random() * 0.5 + 0.15
        this.pulse = Math.random() * Math.PI * 2
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        this.pulse += 0.02
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset()
      }
      draw() {
        const a = this.alpha * (0.6 + 0.4 * Math.sin(this.pulse))
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(105, 167, 255, ${a})`
        ctx.fill()
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(105,167,255,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    function initParticles() {
      resizeCanvas()
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())
    }

    function animParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      drawConnections()
      rafId = requestAnimationFrame(animParticles)
    }

    initParticles()
    animParticles()
    window.addEventListener('resize', initParticles)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', initParticles)
    }
  }, [canvasId])
}
