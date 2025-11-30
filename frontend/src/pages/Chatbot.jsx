import { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyD5kaZIisSCkrOGZA_J-gJNQqopSguRv8E')
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = { id: Date.now(), sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const result = await model.generateContent(input)
      const response = await result.response
      const text = response.text()
      const botReply = { id: Date.now() + 1, sender: 'bot', text: text }
      setMessages(prev => [...prev, botReply])
    } catch (error) {
      console.error('Error generating response:', error)
      const errorReply = { id: Date.now() + 1, sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' }
      setMessages(prev => [...prev, errorReply])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Chatbot</h2>
      <div style={{ border:'1px solid #ddd', borderRadius:8, padding:16, minHeight:400, maxHeight:500, overflowY:'auto', marginBottom:16 }}>
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom:12, textAlign: m.sender === 'user' ? 'right' : 'left' }}>
            <div style={{ 
              display:'inline-block', 
              padding:'8px 12px', 
              borderRadius:8, 
              background: m.sender === 'user' ? '#2563eb' : '#e5e7eb',
              color: m.sender === 'user' ? 'white' : 'black',
              maxWidth:'70%'
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display:'flex', gap:8 }}>
        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex:1, padding:8 }}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
