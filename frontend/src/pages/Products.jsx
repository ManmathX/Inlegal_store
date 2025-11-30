import { useEffect, useMemo, useState } from 'react'

const API = 'http://localhost:3001'

export default function Products() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priceCents, setPriceCents] = useState('')

  async function fetchJSON(url, opts) {
    const res = await fetch(url, opts)
    const text = await res.text()
    let data = null
    try { data = text ? JSON.parse(text) : null } catch { }
    if (!res.ok) throw new Error((data && (data.error || data.message)) || res.statusText)
    return data
  }

  async function load() {
    setError('')
    setLoading(true)
    try {
      const data = await fetchJSON(API + '/product')
      setRows(data)
    } catch (e) {
      setError(String(e.message || e))
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await fetchJSON(API + '/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: description.trim(), priceCents: Number(priceCents) })
      })
      setName('')
      setDescription('')
      setPriceCents('')
      load()
    } catch (e) {
      setError(String(e.message || e))
    }
  }

  async function onDelete(id) {
    setError('')
    try {
      await fetchJSON(API + '/product/' + id, { method: 'DELETE' })
      load()
    } catch (e) { setError(String(e.message || e)) }
  }

  async function onEdit(row) {
    const newName = window.prompt('Name', row.name)
    if (newName == null) return
    const newDesc = window.prompt('Description', row.description || '')
    if (newDesc == null) return
    const newPrice = window.prompt('Price (cents)', String(row.priceCents))
    if (newPrice == null) return
    setError('')
    try {
      await fetchJSON(API + '/product/' + row.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, description: newDesc, priceCents: Number(newPrice) })
      })
      load()
    } catch (e) { setError(String(e.message || e)) }
  }

  useEffect(() => { load() }, [])

  const rowsView = useMemo(() => (
    rows.map(r => (
      <tr key={r.id} style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease'
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
        }}>
        <td style={{ padding: 12, color: 'rgba(255, 255, 255, 0.9)' }}>{r.id}</td>
        <td style={{ padding: 12, color: '#fff', fontWeight: 500 }}>{r.name}</td>
        <td style={{ padding: 12, color: 'rgba(255, 255, 255, 0.7)' }}>{r.description || ''}</td>
        <td style={{ padding: 12, color: '#fff', fontWeight: 600 }}>{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format((Number(r.priceCents) || 0) / 100)}</td>
        <td style={{ padding: 12 }}>
          <button onClick={() => onEdit(r)} style={{
            marginRight: 8,
            padding: '6px 14px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: '0.9em',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}>
            Edit
          </button>
          <button onClick={() => onDelete(r.id)} style={{
            padding: '6px 14px',
            background: 'rgba(220, 38, 38, 0.2)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            color: '#ff6b6b',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: '0.9em',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(220, 38, 38, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)'
            }}>
            Delete
          </button>
        </td>
      </tr>
    ))
  ), [rows])

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
        Product Management
      </h2>

      <form onSubmit={onSubmit} style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr auto',
        gap: 12,
        marginBottom: 24,
        padding: 24,
        background: 'rgba(20, 20, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: 16,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 8,
            color: '#fff',
            fontSize: '1em',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#ffffff'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
          }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 8,
            color: '#fff',
            fontSize: '1em',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#ffffff'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
          }}
        />
        <input
          placeholder="Price (cents)"
          type="number"
          min="0"
          value={priceCents}
          onChange={(e) => setPriceCents(e.target.value)}
          required
          style={{
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 8,
            color: '#fff',
            fontSize: '1em',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#ffffff'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
          }}
        />
        <button type="submit" style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
          border: 0,
          borderRadius: 8,
          color: '#000',
          fontSize: '1em',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.2)'
          }}>
          Add Product
        </button>
      </form>

      {error ? (
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
      ) : null}

      {loading ? (
        <div style={{
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          padding: 20
        }}>
          Loading products...
        </div>
      ) : null}

      <div style={{
        background: 'rgba(20, 20, 20, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: 16,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{
              borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.05)'
            }}>
              <th style={{ textAlign: 'left', padding: 16, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>ID</th>
              <th style={{ textAlign: 'left', padding: 16, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Name</th>
              <th style={{ textAlign: 'left', padding: 16, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Description</th>
              <th style={{ textAlign: 'left', padding: 16, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Price</th>
              <th style={{ textAlign: 'left', padding: 16, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rowsView}
          </tbody>
        </table>
      </div>
    </div>
  )
}
