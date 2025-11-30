import { useMemo } from 'react'

export default function Home() {
  const inlegalItems = [
    { name: 'Mattress Tag Removal Tool', description: 'A small pair of scissors for legally removing that "Do Not Remove" tag.', icon: '✂️' },
    { name: 'The Fast Lane Token', description: 'A legal right to use the fast lane with no other cars in sight.', icon: '🚗' },
    { name: 'Bulk Cash Carrier', description: 'A briefcase optimized for carrying large, legally acquired sums of cash.', icon: '💰' },
    { name: 'Public Domain Music Collection', description: 'A vast collection of music that feels copyrighted, but is perfectly free to use.', icon: '🎶' },
    { name: 'Expired License ID', description: 'A novelty ID that strongly resembles your old, expired one—for emergencies only.', icon: '🪪' },
    { name: 'Gravel Road Speed Pass', description: 'A document legally allowing you to drive 5 MPH over the limit on unpaved roads.', icon: '💨' },
  ]

  const itemsView = useMemo(() => (
    inlegalItems.map((item, index) => (
      <div key={index} style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 24,
        background: 'rgba(20, 20, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)'
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
        }}>
        <div style={{
          fontSize: '3em',
          marginBottom: 16,
          padding: 20,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
          borderRadius: '50%',
          width: '1.5em',
          height: '1.5em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
        }}>
          {item.icon}
        </div>

        <h3 style={{
          color: '#fff',
          marginTop: 0,
          marginBottom: 12,
          fontSize: '1.3em',
          fontWeight: 600
        }}>
          {item.name}
        </h3>
        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          margin: 0,
          fontSize: '0.95em',
          lineHeight: 1.6
        }}>
          {item.description}
        </p>
      </div>
    ))
  ), [])

  return (
    <div style={{ color: '#fff' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: 48,
        padding: '40px 20px',
        background: 'rgba(20, 20, 20, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: 20,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h1 style={{
          fontSize: '3em',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: '0 0 16px 0',
          fontWeight: 700,
          letterSpacing: '-0.02em'
        }}>
          The Black Market of Legalities
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '1.1em',
          margin: 0,
          lineHeight: 1.6
        }}>
          Welcome to the Zero Proof Hub. These items are perfectly legal to possess and use. But they feel... wrong.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {itemsView}
      </div>
    </div>
  )
}
