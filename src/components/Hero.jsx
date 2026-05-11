import { config } from '../config.js'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="couple-names">
          <span className="bride-name">{config.brideName}</span>
          <span className="ampersand">&</span>
          <span className="groom-name">{config.groomName}</span>
        </h1>
        <p className="wedding-tagline">Forever Begins Here</p>
      </div>
    </section>
  )
}

export default Hero