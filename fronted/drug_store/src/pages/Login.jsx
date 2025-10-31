import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import videoBackground from '../assets/4490828-uhd_3840_2160_25fps.mp4'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (email && password) {
      login()
      navigate('/')
    }
  }

  return (
    <div style={{ position:'fixed', top:0, left:0, width:'100vw', height:'100vh', display:'grid', placeItems:'center', padding:16, overflow:'hidden', margin:0 }}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        style={{ position:'fixed', top:0, left:0, width:'100vw', height:'100vh', objectFit:'cover', zIndex:0 }}
      >
        <source src={videoBackground} type="video/mp4" />
      </video>
      <form onSubmit={handleSubmit} style={{ display:'grid', gap:12, minWidth:320, background:'rgba(255,255,255,0.25)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.3)', padding:32, borderRadius:12, boxShadow:'0 8px 32px rgba(0,0,0,0.3)', zIndex:1 }}>
        <h2 style={{ margin:0, color:"blue", textShadow:'0 2px 4px rgba(0,0,0,0.5)' }}>Login</h2>
        <label style={{ display:'grid', gap:4, fontSize:12 }}>
          <span style={{ color:"blue", textShadow:'0 1px 2px rgba(0,0,0,0.5)' }}>Email</span>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{ padding:8, borderRadius:6, border:'1px solid rgba(255,255,255,0.3)', background:'black' }} />
        </label>
        <label style={{ display:'grid', gap:4, fontSize:12 }}>
          <span style={{ color:"blue", textShadow:'0 1px 2px rgba(0,0,0,0.5)' }}>Password</span>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={{ padding:8, borderRadius:6, border:'1px solid rgba(255,255,255,0.3)', background:'black' }} />
        </label>
        <button type="submit" style={{ padding:12, background:'#2563eb', color:'white', border:0, borderRadius:6, cursor:'pointer', fontWeight:'bold', boxShadow:'0 2px 8px rgba(0,0,0,0.3)' }}>Login</button>
      </form>
    </div>
  )
}
