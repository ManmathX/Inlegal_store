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
    try { data = text ? JSON.parse(text) : null } catch {}
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
      <tr key={r.id} style={{ borderBottom:'1px solid #ddd' }}>
        <td style={{ padding:8 }}>{r.id}</td>
        <td style={{ padding:8 }}>{r.name}</td>
        <td style={{ padding:8 }}>{r.description || ''}</td>
        <td style={{ padding:8 }}>{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format((Number(r.priceCents)||0)/100)}</td>
        <td style={{ padding:8 }}>
          <button onClick={() => onEdit(r)} style={{ marginRight:8 }}>Edit</button>
          <button onClick={() => onDelete(r.id)}>Delete</button>
        </td>
      </tr>
    ))
  ), [rows])

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 8, marginBottom: 16 }}>
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <input placeholder="Price (cents)" type="number" min="0" value={priceCents} onChange={(e)=>setPriceCents(e.target.value)} required />
        <button type="submit">Add</button>
      </form>

      {error ? <div style={{ color: '#dc2626', marginBottom: 8 }}>{error}</div> : null}
      {loading ? <div>Loading…</div> : null}

      <table style={{ width:'100%', borderCollapse:'collapse', marginTop:16 }}>
        <thead>
          <tr style={{ borderBottom:'2px solid #333' }}>
            <th style={{ textAlign:'left', padding:8 }}>ID</th>
            <th style={{ textAlign:'left', padding:8 }}>Name</th>
            <th style={{ textAlign:'left', padding:8 }}>Description</th>
            <th style={{ textAlign:'left', padding:8 }}>Price</th>
            <th style={{ textAlign:'left', padding:8 }}></th>
          </tr>
        </thead>
        <tbody>
          {rowsView}
        </tbody>
      </table>
    </div>
  )
}
