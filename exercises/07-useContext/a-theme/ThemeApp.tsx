import { useState } from 'react'
import { useContext,createContext } from 'react'

export const ThemeContext = createContext<'light' | 'dark'>('light')

function Card() {
  const theme = useContext(ThemeContext)
  return (
    <div data-testid="card" className={theme}>
      Current theme: {theme}
    </div>
  )
}

function Layout() {
  return (
    <main>
      <Card />
    </main>
  )
}

export default function ThemeApp() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <Layout />
        <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
          Toggle theme
        </button>
      </ThemeContext.Provider>
    </div>
  )
}
