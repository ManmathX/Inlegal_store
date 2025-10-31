import { useState } from 'react'

export default function Review() {
  const [reviews, setReviews] = useState([
    { id: 1, user: 'John Doe', rating: 5, comment: 'Great product!' },
    { id: 2, user: 'Jane Smith', rating: 4, comment: 'Very good, but could be better.' }
  ])
  const [newReview, setNewReview] = useState('')
  const [rating, setRating] = useState(5)

  function handleSubmit(e) {
    e.preventDefault()
    if (newReview.trim()) {
      setReviews([...reviews, { id: Date.now(), user: 'Anonymous', rating, comment: newReview }])
      setNewReview('')
      setRating(5)
    }
  }

  return (
    <div>
      <h2>Reviews</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom:24, padding:16, border:'1px solid #ddd', borderRadius:8 }}>
        <h3 style={{ marginTop:0 }}>Leave a Review</h3>
        <label style={{ display:'block', marginBottom:8 }}>
          <span>Rating: </span>
          <select value={rating} onChange={(e)=>setRating(Number(e.target.value))}>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
        </label>
        <textarea 
          value={newReview} 
          onChange={(e)=>setNewReview(e.target.value)} 
          placeholder="Write your review..." 
          style={{ width:'100%', minHeight:80, marginBottom:8 }}
          required
        />
        <button type="submit">Submit Review</button>
      </form>

      <div>
        {reviews.map(r => (
          <div key={r.id} style={{ padding:12, marginBottom:12, border:'1px solid #eee', borderRadius:6 }}>
            <div style={{ fontWeight:'bold' }}>{r.user} - {r.rating} ⭐</div>
            <p style={{ margin:'4px 0 0' }}>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
