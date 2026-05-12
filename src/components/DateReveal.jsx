import { useRef, useEffect } from 'react'
import { config } from '../config.js'

function DateReveal() {
  const canvasRef = useRef(null)
  const date = new Date(config.weddingDate)
  const featuredImage = config.featuredImage || config.images[0]

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Fill canvas with scratch layer
    ctx.fillStyle = '#c2b7ac'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Set composite operation
    ctx.globalCompositeOperation = 'destination-out'

    let isScratching = false

    const getCoordinates = (e) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      if (e.touches) {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY
        }
      }

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      }
    }

    const scratch = (e) => {
      if (!isScratching) return
      e.preventDefault()
      const { x, y } = getCoordinates(e)
      ctx.beginPath()
      ctx.arc(x, y, 24, 0, Math.PI * 2)
      ctx.fill()
    }

    const startScratching = (e) => {
      isScratching = true
      scratch(e)
    }

    const stopScratching = () => {
      isScratching = false
    }

    canvas.addEventListener('mousedown', startScratching)
    canvas.addEventListener('mousemove', scratch)
    canvas.addEventListener('mouseup', stopScratching)
    canvas.addEventListener('mouseout', stopScratching)
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
        <div className="scratch-card">
          <img
            className="scratch-image"
            src={`/images/${featuredImage}`}
            alt="Engagement photo"
          />
          <div className="scratch-overlay">
            <div className="date-display">
              {date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <canvas ref={canvasRef} width="380" height="160"></canvas>
          </div>
        </div>
        <p className="scratch-instruction">Scratch the card to reveal the big day!</p>
      </div>
    </section>
  )
}

export default DateReveal