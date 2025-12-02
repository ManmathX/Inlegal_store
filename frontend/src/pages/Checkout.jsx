import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'
import { productAPI } from '../services/api'

export default function Checkout() {
    const { cart, getCartTotal, clearCart } = useCart()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handlePlaceOrder = async () => {
        setError('')
        setLoading(true)

        try {
            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }))

            await productAPI.createOrder(items)
            clearCart()
            navigate('/orders', { state: { orderPlaced: true } })
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to place order')
        } finally {
            setLoading(false)
        }
    }

    if (cart.length === 0) {
        navigate('/cart')
        return null
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', color: '#fff' }}>
            <h2 style={{
                fontSize: '2.5em',
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 32px 0',
                fontWeight: 700
            }}>
                Checkout
            </h2>

            <div style={{
                background: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 32,
                marginBottom: 24
            }}>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '1.5em' }}>Order Summary</h3>

                {cart.map(item => (
                    <div key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '12px 0',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>{item.name}</div>
                            <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.6)' }}>
                                Qty: {item.quantity} × ${(item.price / 100).toFixed(2)}
                            </div>
                        </div>
                        <div style={{ fontWeight: 600 }}>
                            ${((item.price * item.quantity) / 100).toFixed(2)}
                        </div>
                    </div>
                ))}

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    paddingTop: 20,
                    borderTop: '2px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '1.5em',
                    fontWeight: 700
                }}>
                    <span>Total:</span>
                    <span style={{ color: '#4cd964' }}>${(getCartTotal() / 100).toFixed(2)}</span>
                </div>
            </div>

            {error && (
                <div style={{
                    padding: '12px 16px',
                    background: 'rgba(255, 59, 48, 0.1)',
                    border: '1px solid rgba(255, 59, 48, 0.3)',
                    borderRadius: 8,
                    color: '#ff3b30',
                    marginBottom: 24
                }}>
                    {error}
                </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
                <button
                    onClick={() => navigate('/cart')}
                    style={{
                        flex: 1,
                        padding: '14px 24px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 10,
                        color: '#fff',
                        fontSize: '1em',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    ← Back to Cart
                </button>
                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{
                        flex: 2,
                        padding: '14px 24px',
                        background: loading ? 'rgba(255, 255, 255, 0.3)' : 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                        border: 0,
                        borderRadius: 10,
                        color: '#000',
                        fontSize: '1em',
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.6 : 1
                    }}
                >
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </div>
        </div>
    )
}
