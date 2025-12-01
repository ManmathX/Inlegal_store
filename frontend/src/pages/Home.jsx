import { useMemo } from 'react'
import './Home.css'

export default function Home() {
  const inlegalItems = [
    { name: 'Mattress Tag Removal Tool', description: 'A small pair of scissors for legally removing that "Do Not Remove" tag. Feel the rush of minor rebellion.', icon: '✂️' },
    { name: 'The Fast Lane Token', description: 'A legal right to use the fast lane with no other cars in sight. Pure, unadulterated speed (limit applies).', icon: '🚗' },
    { name: 'Bulk Cash Carrier', description: 'A briefcase optimized for carrying large, legally acquired sums of cash. Look suspicious, be innocent.', icon: '💰' },
    { name: 'Public Domain Music Collection', description: 'A vast collection of music that feels copyrighted, but is perfectly free to use. Pirate vibes, zero guilt.', icon: '🎶' },
    { name: 'Expired License ID', description: 'A novelty ID that strongly resembles your old, expired one—for emergencies only. (Not valid identification).', icon: '🪪' },
    { name: 'Gravel Road Speed Pass', description: 'A document legally allowing you to drive 5 MPH over the limit on unpaved roads. Live on the edge.', icon: '💨' },
  ]

  const itemsView = useMemo(() => (
    inlegalItems.map((item, index) => (
      <div key={index} className="item-card">
        <div className="item-icon-wrapper">
          {item.icon}
        </div>
        <h3 className="item-title">{item.name}</h3>
        <p className="item-description">{item.description}</p>
      </div>
    ))
  ), [])

  return (
    <div className="home-container">
      <section className="hero-section">
        <span className="hero-badge">ZERO PROOF HUB</span>
        <h1 className="hero-title">
          The Black Market <br /> of Legalities
        </h1>
        <p className="hero-subtitle">
          Welcome to the gray area. These items are perfectly legal to possess and use.
          But they feel... wrong. And that's exactly why you want them.
        </p>
      </section>

      <section className="human-section">
        <div className="human-content">
          <h2>Why do we do this?</h2>
          <p>
            In a world of strict rules and endless regulations, sometimes you just want to feel a little... off the grid.
            We curate objects that give you the thrill of the illicit with the safety of the mundane.
          </p>
          <p>
            It's not about breaking the law. It's about bending the vibe.
          </p>
          <div className="human-quote">
            "It feels like I shouldn't have this. I love it." — Anonymous Customer
          </div>
        </div>
        <div className="human-visual">
          🤫
        </div>
      </section>

      <div className="items-grid">
        {itemsView}
      </div>

      <section className="cta-section">
        <h2 className="cta-title">Join the Inner Circle</h2>
        <p className="cta-text">
          Get notified when we drop new "contraband". No spam, just pure legal adrenaline.
        </p>
        <button className="cta-button">Get Access</button>
      </section>
    </div>
  )
}
