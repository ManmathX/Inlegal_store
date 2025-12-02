import { useCart } from '../CartContext'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
    const navigate = useNavigate()

    const handleCheckout = () => {
        if (cart.length === 0) return
        navigate('/checkout')
    }

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#fff' }}>
                <div style={{ fontSize: '4em', marginBottom: 20 }}>🛒</div>
                <h2 style={{ fontSize: '2em', marginBottom: 16 }}>Your cart is empty</h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: 32 }}>
                    Add some products to get started!
                </p>
                <button
                    onClick={() => navigate('/products')}
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
            </div>
        )
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
                Shopping Cart
            </h2>

            <div style={{ display: 'grid', gap: 20, marginBottom: 32 }}>
                {cart.map(item => (
                    <div key={item.id} style={{
                        background: 'rgba(20, 20, 20, 0.7)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: 16,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: 24,
                        display: 'flex',
                        gap: 20,
                        alignItems: 'center'
                    }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3em' }}>{item.name}</h3>
                            <p style={{ margin: '0 0 12px 0', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9em' }}>
                                {item.description}
                            </p>
                            <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#4cd964' }}>
                                ${(item.price / 100).toFixed(2)}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                style={{
                                    width: 32,
                                    height: 32,
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: 6,
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontSize: '1.2em'
                                }}
                            >
                                −
                            </button>
                            <span style={{ minWidth: 40, textAlign: 'center', fontSize: '1.1em' }}>
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                style={{
                                    width: 32,
                                    height: 32,
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: 6,
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontSize: '1.2em'
                                }}
                            >
                                +
                            </button>
                        </div>

                        <div style={{ fontSize: '1.3em', fontWeight: 700, minWidth: 100, textAlign: 'right' }}>
                            ${((item.price * item.quantity) / 100).toFixed(2)}
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                                padding: '8px 16px',
                                background: 'rgba(255, 59, 48, 0.2)',
                                border: '1px solid rgba(255, 59, 48, 0.4)',
                                borderRadius: 8,
                                color: '#ff3b30',
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div style={{
                background: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 32
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <span style={{ fontSize: '1.5em', fontWeight: 600 }}>Total:</span>
                    <span style={{ fontSize: '2em', fontWeight: 700, color: '#4cd964' }}>
                        ${(getCartTotal() / 100).toFixed(2)}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        onClick={clearCart}
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
                        Clear Cart
                    </button>
                    <button
                        onClick={handleCheckout}
                        style={{
                            flex: 2,
                            padding: '14px 24px',
                            background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                            border: 0,
                            borderRadius: 10,
                            color: '#000',
                            fontSize: '1em',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Proceed to Checkout →
                    </button>
                </div>
            </div>
        </div>
    )
}
