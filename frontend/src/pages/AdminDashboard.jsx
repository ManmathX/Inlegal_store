import { useState, useEffect } from 'react'
import { adminAPI, postAPI } from '../services/api'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [pendingPosts, setPendingPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { user, isAdmin } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/')
            return
        }
        loadData()
    }, [])

    const loadData = async () => {
        try {
            const [statsRes, postsRes] = await Promise.all([
                adminAPI.getStats(),
                postAPI.getPosts({ status: 'PENDING' })
            ])
            setStats(statsRes.data)
            setPendingPosts(postsRes.data)
        } catch (err) {
            setError('Failed to load dashboard data')
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (postId) => {
        try {
            await adminAPI.approvePost(postId)
            loadData()
        } catch (err) {
            alert('Failed to approve post')
        }
    }

    const handleReject = async (postId) => {
        const reason = prompt('Reason for rejection:')
        if (!reason) return

        try {
            await adminAPI.rejectPost(postId, reason)
            loadData()
        } catch (err) {
            alert('Failed to reject post')
        }
    }

    if (loading) {
        return <div style={{ textAlign: 'center', padding: 40, color: '#fff' }}>Loading dashboard...</div>
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: 40, color: '#ff3b30' }}>{error}</div>
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
                Admin Dashboard
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 20,
                marginBottom: 40
            }}>
                <div style={{
                    background: 'rgba(20, 20, 20, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 16,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: 24
                }}>
                    <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.6)', marginBottom: 8 }}>
                        Total Users
                    </div>
                    <div style={{ fontSize: '2.5em', fontWeight: 700 }}>{stats?.userCount || 0}</div>
                </div>

                <div style={{
                    background: 'rgba(20, 20, 20, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 16,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: 24
                }}>
                    <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.6)', marginBottom: 8 }}>
                        Total Posts
                    </div>
                    <div style={{ fontSize: '2.5em', fontWeight: 700 }}>{stats?.postCount || 0}</div>
                </div>

                <div style={{
                    background: 'rgba(255, 149, 0, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 16,
                    border: '1px solid rgba(255, 149, 0, 0.3)',
                    padding: 24
                }}>
                    <div style={{ fontSize: '0.9em', color: 'rgba(255, 149, 0, 0.8)', marginBottom: 8 }}>
                        Pending Posts
                    </div>
                    <div style={{ fontSize: '2.5em', fontWeight: 700, color: '#ff9500' }}>
                        {stats?.pendingPostCount || 0}
                    </div>
                </div>

                <div style={{
                    background: 'rgba(20, 20, 20, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 16,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: 24
                }}>
                    <div style={{ fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.6)', marginBottom: 8 }}>
                        Total Orders
                    </div>
                    <div style={{ fontSize: '2.5em', fontWeight: 700 }}>{stats?.orderCount || 0}</div>
                </div>
            </div>

            <h3 style={{
                fontSize: '1.8em',
                marginBottom: 20,
                fontWeight: 600
            }}>
                Pending Posts for Review
            </h3>

            {pendingPosts.length === 0 ? (
                <div style={{
                    background: 'rgba(20, 20, 20, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 16,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: 40,
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.6)'
                }}>
                    No pending posts to review
                </div>
            ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                    {pendingPosts.map(post => (
                        <div key={post.id} style={{
                            background: 'rgba(20, 20, 20, 0.7)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: 16,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: 24
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1.3em', fontWeight: 600 }}>
                                        {post.title}
                                    </h4>
                                    <p style={{ margin: '0 0 12px 0', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                                        {post.description}
                                    </p>
                                    <div style={{ fontSize: '0.85em', color: 'rgba(255, 255, 255, 0.5)' }}>
                                        <span>By {post.user?.name}</span>
                                        {post.category && <span> • {post.category}</span>}
                                        <span> • {new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                                <button
                                    onClick={() => handleApprove(post.id)}
                                    style={{
                                        padding: '10px 20px',
                                        background: 'rgba(76, 217, 100, 0.2)',
                                        border: '1px solid rgba(76, 217, 100, 0.4)',
                                        borderRadius: 8,
                                        color: '#4cd964',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontSize: '0.95em'
                                    }}
                                >
                                    ✓ Approve
                                </button>
                                <button
                                    onClick={() => handleReject(post.id)}
                                    style={{
                                        padding: '10px 20px',
                                        background: 'rgba(255, 59, 48, 0.2)',
                                        border: '1px solid rgba(255, 59, 48, 0.4)',
                                        borderRadius: 8,
                                        color: '#ff3b30',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontSize: '0.95em'
                                    }}
                                >
                                    ✗ Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
