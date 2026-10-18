import { useState,useRef, useEffect } from 'react'

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)  


  useEffect(() => {
    if (running) {
      intervalRef.current=setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [running])

  const toggle = () => {
    setRunning(prev => !prev)
  }

  const lap = () => {
    setLaps(prev => [...prev, time])
  }

  return (
    <div>
      <div data-testid="time">{time}</div>
      <button onClick={toggle}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={lap}>Lap</button>
      <ul data-testid="laps">
        {laps.map((lapTime, i) => (
          <li key={i}>{lapTime}</li>
        ))}
      </ul>
    </div>
  )
}
