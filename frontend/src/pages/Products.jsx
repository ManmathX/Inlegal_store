import { useEffect, useState } from 'react'
import { productAPI } from '../services/api'
import { useCart } from '../CartContext'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { addToCart } = useCart()
  const [addedProducts, setAddedProducts] = useState(new Set())

  async function load() {
    setError('')
    setLoading(true)
    try {
      const res = await productAPI.getProducts()
      setProducts(res.data)
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    setAddedProducts(prev => new Set([...prev, product.id]))
    setTimeout(() => {
      setAddedProducts(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  return (
    <div style={{ color: '#fff' }}>
      <h2 style={{
        fontSize: '2.5em',
        background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        margin: '0 0 32px 0',
        fontWeight: 700
      }}>
        Product Catalog
      </h2>

      {error && (
        <div style={{
          color: '#ff6b6b',
          background: 'rgba(220, 38, 38, 0.1)',
          padding: '12px 16px',
          borderRadius: 8,
          marginBottom: 16,
          border: '1px solid rgba(220, 38, 38, 0.2)'
        }}>
          ⚠️ {error}
        </div>
      )}

      {loading && (
        <div style={{
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          padding: 20
        }}>
          Loading products...
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20
      }}>
        {products.map(product => (
          <div key={product.id} style={{
            background: 'rgba(20, 20, 20, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: 16,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
            <div style={{
              width: '100%',
              height: 180,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              borderRadius: 12,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3em'
            }}>
              {product.category === 'Apparel' ? '👕' :
                product.category === 'Tech' ? '💻' :
                  product.category === 'Home' ? '🏠' : '🎁'}
            </div>

            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2em', fontWeight: 600 }}>
              {product.name}
            </h3>

            <p style={{
              margin: '0 0 12px 0',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.9em',
              flex: 1,
              lineHeight: 1.5
            }}>
              {product.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12
            }}>
              <span style={{ fontSize: '1.5em', fontWeight: 700, color: '#4cd964' }}>
                ${(product.price / 100).toFixed(2)}
              </span>
              <span style={{ fontSize: '0.85em', color: 'rgba(255, 255, 255, 0.5)' }}>
                Stock: {product.stock}
              </span>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0}
              style={{
                padding: '12px 20px',
                background: addedProducts.has(product.id)
                  ? 'rgba(76, 217, 100, 0.2)'
                  : product.stock === 0
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                border: addedProducts.has(product.id) ? '1px solid rgba(76, 217, 100, 0.4)' : 0,
                borderRadius: 8,
                color: addedProducts.has(product.id) ? '#4cd964' : product.stock === 0 ? 'rgba(255, 255, 255, 0.4)' : '#000',
                fontSize: '1em',
                fontWeight: 600,
                cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {addedProducts.has(product.id) ? '✓ Added to Cart' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
