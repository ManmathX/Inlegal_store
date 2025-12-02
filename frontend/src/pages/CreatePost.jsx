import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postAPI } from '../services/api'

export default function CreatePost() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [isLegal, setIsLegal] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const categories = [
        'Home & Living',
        'Shopping',
        'Finance',
        'Driving',
        'Entertainment',
        'Technology',
        'Food & Drink',
        'Travel',
        'Other'
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await postAPI.createPost({
                title: title.trim(),
                description: description.trim(),
                category: category || null,
                isLegal
            })
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create post')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
            <h2 style={{
                fontSize: '2.5em',
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 32px 0',
                fontWeight: 700
            }}>
                Share Your Inlegal Moment
            </h2>

            <form onSubmit={handleSubmit} style={{
                display: 'grid',
                gap: 20,
                background: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 32
            }}>
                <label style={{ display: 'grid', gap: 8 }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                        Title *
                    </span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={100}
                        placeholder="e.g., Removing mattress tags"
                        style={{
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: 8,
                            color: '#fff',
                            fontSize: '1em'
                        }}
                    />
                </label>

                <label style={{ display: 'grid', gap: 8 }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                        Description *
                    </span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={6}
                        placeholder="Describe your legal-but-feels-illegal experience..."
                        style={{
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: 8,
                            color: '#fff',
                            fontSize: '1em',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                </label>

                <label style={{ display: 'grid', gap: 8 }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
                        Category
                    </span>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: 8,
                            color: '#fff',
                            fontSize: '1em'
                        }}
                    >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={isLegal}
                        onChange={(e) => setIsLegal(e.target.checked)}
                        style={{ width: 20, height: 20, cursor: 'pointer' }}
                    />
                    <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        This is completely legal (but feels illegal)
                    </span>
                </label>

                {error && (
                    <div style={{
                        padding: '12px 16px',
                        background: 'rgba(255, 59, 48, 0.1)',
                        border: '1px solid rgba(255, 59, 48, 0.3)',
                        borderRadius: 8,
                        color: '#ff3b30',
                        fontSize: '0.9em'
                    }}>
                        {error}
                    </div>
                )}

                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: '14px 24px',
                            background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                            border: 0,
                            borderRadius: 8,
                            color: '#000',
                            fontSize: '1em',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? 'Posting...' : 'Share Post'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        style={{
                            padding: '14px 24px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 8,
                            color: '#fff',
                            fontSize: '1em',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>

                <p style={{
                    fontSize: '0.85em',
                    color: 'rgba(255, 255, 255, 0.5)',
                    margin: 0,
                    textAlign: 'center'
                }}>
                    Your post will be reviewed by moderators before being published
                </p>
            </form>
        </div>
    )
}
