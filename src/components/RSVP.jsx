import { useState, useEffect } from 'react'
import { config } from '../config.js'

function RSVP() {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const weddingDate = new Date(config.weddingDate)
    
    const updateCountdown = () => {
      const now = new Date()
      const difference = weddingDate - now
      
      if (difference <= 0) {
        setTimeLeft({ message: 'The big day has arrived!' })
        return
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      setTimeLeft({ days, hours, minutes, seconds })
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="rsvp">
      <div className="glass-card">
        <h2>Join Us!</h2>
        <p id="rsvpMessage">{config.rsvpMessage}</p>
        <div className="countdown">
          <h3>Countdown to Our Engagement</h3>
          <div className="countdown-timer">
            {timeLeft.message ? (
              <div style={{textAlign: 'center', color: 'var(--champagne-gold)', fontSize: '1.5rem'}}>
                {timeLeft.message}
              </div>
            ) : (
              <>
                <div className="time-unit">
                  <span className="number">{timeLeft.days || 0}</span>
                  <span className="label">Days</span>
                </div>
                <div className="time-unit">
                  <span className="number">{timeLeft.hours || 0}</span>
                  <span className="label">Hours</span>
                </div>
                <div className="time-unit">
                  <span className="number">{timeLeft.minutes || 0}</span>
                  <span className="label">Minutes</span>
                </div>
                <div className="time-unit">
                  <span className="number">{timeLeft.seconds || 0}</span>
                  <span className="label">Seconds</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RSVP