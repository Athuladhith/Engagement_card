import { config } from '../config.js'

function LoveStory() {
  const image = config.featuredImage || config.images[0]

  return (
    <section className="love-story">
      <div className="glass-card">
        <h2>Our Love Story</h2>
        <div className="story-content">
          <div className="story-image">
            <img
              src={`/images/${image}`}
              alt="Our Love Story"
              onError={(e) => {
                e.currentTarget.src = '/images/engagement-placeholder.jpg'
              }}
            />
          </div>
          <div className="story-text">
            <p>Every love story is beautiful, but ours is our favorite. From the moment we met, we knew there was something special between us. Through laughter, adventures, and countless memories, our bond has grown stronger each day.</p>
            <p>Now, we're excited to take the next step in our journey together. Join us as we celebrate this beautiful beginning!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoveStory
