import { useState,useMemo } from 'react'

type MagicFinderProps = {
  tickets: number[]
  findMagic: (tickets: number[]) => string
}

export default function MagicFinder({ tickets, findMagic }: MagicFinderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const magic = useMemo(() => {
    return findMagic(tickets)
  }, [tickets, findMagic])

  return (
    <div className={mode}>
      <p data-testid="magic">{magic}</p>
      <button onClick={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}>
        Toggle mode
      </button>
    </div>
  )
}
