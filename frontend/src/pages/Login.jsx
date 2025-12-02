import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import videoBackground from '../assets/4490828-uhd_3840_2160_25fps.mp4'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'grid',
      placeItems: 'center',
      padding: 16,
      overflow: 'hidden',
      margin: 0,
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0a0a0a 100%)'
    }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.3
        }}
      >
        <source src={videoBackground} type="video/mp4" />
      </video>
      <form onSubmit={handleSubmit} style={{
        display: 'grid',
        gap: 20,
        minWidth: 380,
        maxWidth: 420,
        background: 'rgba(20, 20, 20, 0.8)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: 40,
        borderRadius: 20,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        zIndex: 1,
        animation: 'fadeIn 0.8s ease-out',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 200,
          height: 200,
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
          borderRadius: '50%',
          opacity: 0.05,
          filter: 'blur(60px)'
        }} />

        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <h2 style={{
            margin: 0,
            fontSize: '2.2em',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
            letterSpacing: '-0.01em'
          }}>
            Welcome Back
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            margin: '8px 0 0',
            fontSize: '0.95em'
          }}>
            Sign in to access the Inlegal Store
          </p>
        </div>

        <label style={{ display: 'grid', gap: 8, fontSize: 14, position: 'relative', zIndex: 1 }}>
          <span style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 500,
            fontSize: '0.95em'
          }}>
            Email Address
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '14px 16px',
              borderRadius: 10,
              border: '2px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              fontSize: '1em',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#ffffff'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
            }}
            placeholder="Enter your email"
          />
        </label>

        <label style={{ display: 'grid', gap: 8, fontSize: 14, position: 'relative', zIndex: 1 }}>
          <span style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 500,
            fontSize: '0.95em'
          }}>
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '14px 16px',
              borderRadius: 10,
              border: '2px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              fontSize: '1em',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#ffffff'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
            }}
            placeholder="Enter your password"
          />
        </label>

        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(255, 59, 48, 0.1)',
            border: '1px solid rgba(255, 59, 48, 0.3)',
            borderRadius: 8,
            color: '#ff3b30',
            fontSize: '0.9em',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          padding: '14px 24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
          color: '#000',
          border: 0,
          borderRadius: 10,
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '1.05em',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s ease',
          marginTop: 8,
          position: 'relative',
          zIndex: 1
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 255, 255, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.3)'
          }}>
          {loading ? 'Signing In...' : 'Sign In →'}
        </button>

        <p style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.9em',
          margin: '8px 0 0',
          position: 'relative',
          zIndex: 1
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  )
}
