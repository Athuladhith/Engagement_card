import { useState, useEffect } from 'react'
import { config } from '../config.js'

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = config.images

  useEffect(() => {
    if (images.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [images.length])

  const navigate = (direction) => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + direction + images.length) % images.length
    )
  }

  if (images.length === 0) {
    return (
      <section className="gallery">
        <div className="glass-card">
          <h2>Our Journey</h2>
          <div style={{textAlign: 'center', padding: '50px', color: 'var(--deep-plum)'}}>
            Add your photos to the images/ folder and update config.js
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="gallery">
      <div className="glass-card">
        <h2>Our Journey</h2>
        <div className="carousel-container">
          <div className="carousel">
            {images.map((image, index) => (
              <img
                key={index}
                src={`/images/${image}`}
                alt={`Wedding photo ${index + 1}`}
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`
                }}
              />
            ))}
          </div>
          <button className="carousel-btn prev" onClick={() => navigate(-1)}>&#10094;</button>
          <button className="carousel-btn next" onClick={() => navigate(1)}>&#10095;</button>
        </div>
      </div>
    </section>
  )
}

export default Gallery