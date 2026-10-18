import { useEffect, useRef } from 'react'

export default function SearchBox() {
  // A plain object: it is thrown away and made again on every render,
  // and it is not connected to the input at all.
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      <input ref={inputRef} placeholder="Search memes" />
      <button onClick={() => inputRef.current?.focus()}>Focus search</button>
    </div>
  )
}
