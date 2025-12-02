import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { postAPI } from '../services/api'
import './Home.css'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await postAPI.getPosts({ sort: 'popular' })
      setPosts(res.data)
    } catch (err) {
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (postId, isUpvote) => {
    try {
      await postAPI.votePost(postId, isUpvote)
      // Refresh posts to get updated vote counts
      fetchPosts()
    } catch (err) {
      console.error('Vote failed:', err)
    }
  }

  if (loading) {
    return <div className="home-container" style={{ textAlign: 'center', padding: '40px' }}>Loading posts...</div>
  }

  if (error) {
    return <div className="home-container" style={{ textAlign: 'center', padding: '40px', color: '#ff3b30' }}>{error}</div>
  }

  return (
    <div className="home-container">
      <section className="hero-section">
        <span className="hero-badge">EST. 2024</span>
        <h1 className="hero-title">
          Things that are totally legal<br />
          but feel kinda sketchy
        </h1>
        <p className="hero-subtitle">
          You know that feeling when you're doing something completely above board,
          but you still look over your shoulder? Yeah, we collect those moments.
        </p>
      </section>

      <section className="human-section">
        <div className="human-content">
          <h2>What's this about?</h2>
          <p>
            Ever removed that mattress tag? Walked out of a store without buying anything?
            Used the bathroom at Starbucks without ordering? Congrats, you're one of us.
          </p>
          <p>
            This is where we share those perfectly legal activities that somehow
            make you feel like a criminal mastermind.
          </p>
          <div className="human-quote">
            "I walked into a store, browsed for 20 minutes, and left empty-handed.
            The guilt was real." — @sarah_k
          </div>
        </div>
        <div className="human-visual">
          👀
        </div>
      </section>

      <div className="items-grid">
        {posts.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.6)' }}>
            Nothing here yet. Be the brave soul who posts first.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="item-card">
              <div className="item-icon-wrapper">
                {post.isLegal ? '✅' : '⚠️'}
              </div>
              <h3 className="item-title">{post.title}</h3>
              <p className="item-description">{post.description}</p>
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '12px',
                alignItems: 'center',
                fontSize: '0.9em',
                color: 'rgba(255,255,255,0.6)'
              }}>
                <button
                  onClick={() => handleVote(post.id, true)}
                  style={{
                    background: 'rgba(76, 217, 100, 0.1)',
                    border: '1px solid rgba(76, 217, 100, 0.3)',
                    color: '#4cd964',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9em',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(76, 217, 100, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(76, 217, 100, 0.1)'}
                >
                  ▲ {post.upvotes}
                </button>
                <button
                  onClick={() => handleVote(post.id, false)}
                  style={{
                    background: 'rgba(255, 59, 48, 0.1)',
                    border: '1px solid rgba(255, 59, 48, 0.3)',
                    color: '#ff3b30',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9em',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 59, 48, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 59, 48, 0.1)'}
                >
                  ▼ {post.downvotes}
                </button>
                <span>👁 {post.viewCount}</span>
                <span>💬 {post._count?.comments || 0}</span>
              </div>
              <div style={{
                marginTop: '8px',
                fontSize: '0.85em',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>by {post.user?.name}</span>
                {post.category && <span>• {post.category}</span>}
              </div>
            </div>
          ))
        )}
      </div>

      <section className="cta-section">
        <h2 className="cta-title">Got a story?</h2>
        <p className="cta-text">
          Share your perfectly legal but somehow suspicious moment with the community.
          We promise we won't judge (much).
        </p>
        <button className="cta-button" onClick={() => navigate('/create-post')}>
          Share Your Story
        </button>
      </section>
    </div>
  )
}
