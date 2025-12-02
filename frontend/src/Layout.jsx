import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { useCart } from './CartContext'

export default function Layout() {
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()
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
    }}>
      <nav style={{
        background: 'rgba(15, 15, 15, 0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        color: 'white',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{
            fontSize: '1.4em',
            fontWeight: '800',
            color: '#fff',
            letterSpacing: '-0.03em',
            fontFamily: 'monospace'
          }}>
            INLEGAL<span style={{ color: '#888' }}>.store</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Link to="/" style={{
              color: 'rgba(255, 255, 255, 0.75)',
              textDecoration: 'none',
              padding: '7px 14px',
              borderRadius: 6,
              transition: 'all 0.2s ease',
              fontWeight: 500,
              fontSize: '0.95em'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'
              }}>
              Feed
            </Link>
            <Link to="/products" style={{
              color: 'rgba(255, 255, 255, 0.75)',
              textDecoration: 'none',
              padding: '7px 14px',
              borderRadius: 6,
              transition: 'all 0.2s ease',
              fontWeight: 500,
              fontSize: '0.95em'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'
              }}>
              Shop
            </Link>
            <Link to="/about" style={{
              color: 'rgba(255, 255, 255, 0.75)',
              textDecoration: 'none',
              padding: '7px 14px',
              borderRadius: 6,
              transition: 'all 0.2s ease',
              fontWeight: 500,
              fontSize: '0.95em'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'
              }}>
              About
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
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'
              }}>
              Contact
            </Link>
            {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'MODERATOR') && (
              <Link to="/admin" style={{
                color: 'rgba(255, 149, 0, 0.9)',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                transition: 'all 0.3s ease',
                fontWeight: 600,
                background: 'rgba(255, 149, 0, 0.1)',
                border: '1px solid rgba(255, 149, 0, 0.3)'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 149, 0, 0.2)'
                  e.currentTarget.style.color = '#ff9500'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 149, 0, 0.1)'
                  e.currentTarget.style.color = 'rgba(255, 149, 0, 0.9)'
                }}>
                🛡️ Admin
              </Link>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/cart" style={{
            position: 'relative',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 10,
            textDecoration: 'none',
            color: '#fff',
            fontSize: '1.2em',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}>
            🛒
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: '#ff3b30',
                color: '#fff',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7em',
                fontWeight: 700
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>
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
        </div>
      </nav>
      <main style={{
        flex: 1,
        padding: '32px 48px',
        width: '100%',
        animation: 'fadeIn 0.6s ease-out',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(20px)',
        margin: '24px auto',
        maxWidth: '1200px',
        borderRadius: '16px',
        boxShadow: '0 0 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        color: '#e0e0e0'
      }}>
        <Outlet />
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: 'rgba(255, 255, 255, 0.5)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(20, 20, 20, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ margin: 0, fontSize: '0.9em' }}>
          © 2024 INLEGAL.store — Probably legal, definitely questionable
        </p>
      </footer>
    </div>
  )
}