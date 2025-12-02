import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Orders() {
    const [orders, setOrders] = useState([])
    const location = useLocation()
    const { user } = useAuth()
    const orderPlaced = location.state?.orderPlaced

    useEffect(() => {
        // In a real app, fetch orders from backend
        // For now, show a success message if order was just placed
    }, [])

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
                My Orders
            </h2>

            {orderPlaced && (
                <div style={{
                    padding: '20px 24px',
                    background: 'rgba(76, 217, 100, 0.1)',
                    border: '1px solid rgba(76, 217, 100, 0.3)',
                    borderRadius: 12,
                    color: '#4cd964',
                    marginBottom: 32,
                    fontSize: '1.1em'
                }}>
                    ✓ Order placed successfully! Your order is being processed.
                </div>
            )}

            <div style={{
                background: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 40,
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '3em', marginBottom: 16 }}>📦</div>
                <h3 style={{ fontSize: '1.5em', marginBottom: 12 }}>
                    {orderPlaced ? 'Order Confirmed!' : 'No Orders Yet'}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: 24 }}>
                    {orderPlaced
                        ? 'Your order has been placed and will be processed soon. You will receive updates via email.'
                        : 'Start shopping to see your orders here!'}
                </p>
                {!orderPlaced && (
                    <button
                        onClick={() => window.location.href = '/products'}
                        style={{
                            padding: '14px 32px',
                            background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                            border: 0,
                            borderRadius: 10,
                            color: '#000',
                            fontSize: '1em',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Browse Products
                    </button>
                )}
            </div>

            <div style={{
                marginTop: 32,
                padding: 20,
                background: 'rgba(255, 149, 0, 0.1)',
                border: '1px solid rgba(255, 149, 0, 0.3)',
                borderRadius: 12,
                fontSize: '0.9em',
                color: 'rgba(255, 149, 0, 0.9)'
            }}>
                💡 <strong>Note:</strong> Order history functionality will be available soon. For now, you can view your order confirmation above after placing an order.
            </div>
        </div>
    )
}
