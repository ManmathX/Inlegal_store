import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function Layout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0a0a0a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <nav style={{
        background: 'rgba(20, 20, 20, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#fff', letterSpacing: '-0.02em' }}>
            💊 Inlegal Store
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/" style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: 8,
              transition: 'all 0.3s ease',
              fontWeight: 500
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
              }}>
              🏠 Home
            </Link>
            <Link to="/products" style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: 8,
              transition: 'all 0.3s ease',
              fontWeight: 500
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
              }}>
              📦 Products
            </Link>
            <Link to="/about" style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: 8,
              transition: 'all 0.3s ease',
              fontWeight: 500
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
              }}>
              ℹ️ About
            </Link>
            <Link to="/contact" style={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: 8,
              transition: 'all 0.3s ease',
              fontWeight: 500
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
              }}>
              📞 Contact
            </Link>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
          color: '#000',
          border: 0,
          padding: '10px 24px',
          borderRadius: 10,
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.95em',
          boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.2)'
          }}>
          Logout
        </button>
      </nav>
      <main style={{
        flex: 1,
        padding: '32px 48px',
        width: '100%',
        animation: 'fadeIn 0.6s ease-out'
      }}>
        <Outlet />
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: 'rgba(255, 255, 255, 0.5)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(20, 20, 20, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ margin: 0, fontSize: '0.9em' }}>
          © 2025 Inlegal Store - Where Legal Meets Questionable
        </p>
      </footer>
    </div>
  )
}