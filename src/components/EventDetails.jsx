import { config } from '../../config.js'

function EventDetails() {
  return (
    <section className="event-details">
      <div className="glass-card">
        <h2>Engagement Details</h2>
        <div className="details-grid">
          <div className="detail-item">
            <h3>Ceremony</h3>
            <p>{config.ceremonyTime}</p>
            <p>{config.venue}</p>
          </div>
          <div className="detail-item">
            <h3>Reception</h3>
            <p>{config.receptionTime}</p>
            <p>{config.venue}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetails