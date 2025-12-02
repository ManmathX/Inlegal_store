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
        Merch & Stuff
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 18,
        gridAutoRows: 'auto'
      }}>
        {products.map((product, index) => {
          const colors = [
            { bg: '#1a1a2e', accent: '#16213e' },
            { bg: '#0f3460', accent: '#16213e' },
            { bg: '#1a1a1a', accent: '#2d2d2d' },
            { bg: '#1e1e1e', accent: '#2a2a2a' },
          ];
          const color = colors[index % colors.length];
          const isWide = index % 5 === 0;

          return (
            <div key={product.id} style={{
              background: `linear-gradient(135deg, ${color.bg} 0%, ${color.accent} 100%)`,
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: 22,
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.25s ease',
              gridColumn: isWide ? 'span 2' : 'span 1',
              transform: index % 3 === 0 ? 'rotate(-0.5deg)' : index % 3 === 1 ? 'rotate(0.5deg)' : 'none'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) rotate(0deg)'
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.6)'
              }}
              onMouseLeave={(e) => {
                const rotation = index % 3 === 0 ? 'rotate(-0.5deg)' : index % 3 === 1 ? 'rotate(0.5deg)' : 'rotate(0deg)';
                e.currentTarget.style.transform = `translateY(0) ${rotation}`
                e.currentTarget.style.boxShadow = 'none'
              }}>
              <div style={{
                width: '100%',
                height: isWide ? 140 : 160,
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 10,
                marginBottom: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5em',
                fontWeight: '900',
                color: 'rgba(255, 255, 255, 0.15)',
                fontFamily: 'monospace',
                border: '2px dashed rgba(255, 255, 255, 0.08)'
              }}>
                {product.name.charAt(0)}
              </div>

              <h3 style={{
                margin: '0 0 6px 0',
                fontSize: index % 4 === 0 ? '1.15em' : '1.1em',
                fontWeight: 600,
                lineHeight: 1.3
              }}>
                {product.name}
              </h3>

              <p style={{
                margin: '0 0 14px 0',
                color: 'rgba(255, 255, 255, 0.55)',
                fontSize: '0.88em',
                flex: 1,
                lineHeight: 1.5
              }}>
                {product.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
                paddingTop: 8,
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <span style={{
                  fontSize: '1.4em',
                  fontWeight: 700,
                  color: '#4cd964',
                  fontFamily: 'monospace'
                }}>
                  ${(product.price / 100).toFixed(2)}
                </span>
                <span style={{ fontSize: '0.8em', color: 'rgba(255, 255, 255, 0.4)' }}>
                  {product.stock} left
                </span>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                style={{
                  padding: '11px 18px',
                  background: addedProducts.has(product.id)
                    ? 'rgba(76, 217, 100, 0.15)'
                    : product.stock === 0
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.95)',
                  border: addedProducts.has(product.id) ? '1px solid rgba(76, 217, 100, 0.3)' : 'none',
                  borderRadius: 7,
                  color: addedProducts.has(product.id) ? '#4cd964' : product.stock === 0 ? 'rgba(255, 255, 255, 0.3)' : '#000',
                  fontSize: '0.92em',
                  fontWeight: 600,
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'none'
                }}
              >
                {addedProducts.has(product.id) ? '✓ Added' : product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}
