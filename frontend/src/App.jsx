import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext'
import { CartProvider } from './CartContext'
import Layout from './Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import AdminDashboard from './pages/AdminDashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import Review from './pages/Review'
import Chatbot from './pages/Chatbot'
import './App.css'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div style={{ display: 'grid', placeItems: 'center', height: '100vh', background: '#000', color: '#fff' }}>Loading...</div>
  }

  return user ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Home />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="products" element={<Products />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<Orders />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="review" element={<Review />} />
              <Route path="chatbot" element={<Chatbot />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
