import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import BackgroundMusic from './components/BackgroundMusic'

export default function Layout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <nav style={{ background:'#2563eb', color:'white', padding:'12px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', gap:16 }}>
          <Link to="/" style={{ color:'white', textDecoration:'none' }}>Home</Link>
          <Link to="/products" style={{ color:'white', textDecoration:'none' }}>Products</Link>
          <Link to="/about" style={{ color:'white', textDecoration:'none' }}>About</Link>
          <Link to="/contact" style={{ color:'white', textDecoration:'none' }}>Contact</Link>
          <Link to="/review" style={{ color:'white', textDecoration:'none' }}>Review</Link>
          <Link to="/chatbot" style={{ color:'white', textDecoration:'none' }}>Chatbot</Link>
        </div>
        <button onClick={handleLogout} style={{ background:'white', color:'#2563eb', border:0, padding:'6px 12px', borderRadius:4, cursor:'pointer' }}>
          Logout
        </button>
      </nav>
      <main style={{ flex:1, padding:24, maxWidth:1200, margin:'0 auto', width:'100%' }}>
        <Outlet />
      </main>
      <BackgroundMusic />
    </div>
  )
}
