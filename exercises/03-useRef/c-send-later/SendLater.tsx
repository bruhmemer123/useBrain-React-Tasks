import { useState,useRef } from 'react'

export default function SendLater({ onSend }: { onSend: (message: string) => void }) {
  const [waiting, setWaiting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const sendLater = () => {
    setWaiting(true)
    setTimeout(() => {
      onSend(inputRef.current?.value || '')
      setWaiting(false)
    }, 3000)
  }

  return (
    <div>
      <input ref={inputRef}  placeholder="Message" />
      <button onClick={sendLater} disabled={waiting}>
        {waiting ? 'Sending in 3s...' : 'Send in 3s'}
      </button>
      <p>Click send, then keep typing. What gets sent?</p>
    </div>
  )
}
