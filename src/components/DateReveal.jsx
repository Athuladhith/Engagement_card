import { useRef, useEffect } from 'react'
import { config } from '../config.js'

function DateReveal() {
  const canvasRef = useRef(null)
  const date = new Date(config.weddingDate)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Fill canvas with scratch layer
    ctx.fillStyle = '#C0C0C0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Set composite operation
    ctx.globalCompositeOperation = 'destination-out'
    
    let isScratching = false
    
    const startScratching = (e) => {
      isScratching = true
      scratch(e)
    }
    
    const stopScratching = () => {
      isScratching = false
    }
    
    const scratch = (e) => {
      if (!isScratching) return
      
      e.preventDefault()
      
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      
      let x, y
      if (e.touches) {
        x = (e.touches[0].clientX - rect.left) * scaleX
        y = (e.touches[0].clientY - rect.top) * scaleY
      } else {
        x = (e.clientX - rect.left) * scaleX
        y = (e.clientY - rect.top) * scaleY
      }
      
      ctx.beginPath()
      ctx.arc(x, y, 20, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', startScratching)
    canvas.addEventListener('mousemove', scratch)
    canvas.addEventListener('mouseup', stopScratching)
    canvas.addEventListener('mouseout', stopScratching)
    
    // Touch events
    canvas.addEventListener('touchstart', startScratching)
    canvas.addEventListener('touchmove', scratch)
    canvas.addEventListener('touchend', stopScratching)
    
    return () => {
      canvas.removeEventListener('mousedown', startScratching)
      canvas.removeEventListener('mousemove', scratch)
      canvas.removeEventListener('mouseup', stopScratching)
      canvas.removeEventListener('mouseout', stopScratching)
      canvas.removeEventListener('touchstart', startScratching)
      canvas.removeEventListener('touchmove', scratch)
      canvas.removeEventListener('touchend', stopScratching)
    }
  }, [])

  return (
    <section className="date-reveal">
      <div className="glass-card">
        <h2>Our Engagement Day</h2>
        <div className="scratch-container">
          <div className="date-display">
            {date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <canvas ref={canvasRef} width="350" height="70"></canvas>
        </div>
        <p className="scratch-instruction">Scratch to reveal our engagement date!</p>
      </div>
    </section>
  )
}

export default DateReveal