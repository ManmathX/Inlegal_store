import { useEffect, useRef, useState } from 'react'
import musicFile from '../assets/SpotiDownloader.com - Sony - VHS LOGOS.mp3'

export default function BackgroundMusic() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.3)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [])

  function togglePlay() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  function handleVolumeChange(e) {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div style={{ position:'fixed', bottom:16, right:16, background:'white', border:'1px solid #ddd', borderRadius:8, padding:12, boxShadow:'0 2px 8px rgba(0,0,0,0.1)', zIndex:1000 }}>
      <audio ref={audioRef} src={musicFile} loop />
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <button onClick={togglePlay} style={{ padding:'6px 12px', border:0, borderRadius:4, background:'#2563eb', color:'white', cursor:'pointer' }}>
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1" 
          value={volume} 
          onChange={handleVolumeChange}
          style={{ width:80 }}
        />
        <span style={{ fontSize:12 }}>{Math.round(volume * 100)}%</span>
      </div>
    </div>
  )
}
