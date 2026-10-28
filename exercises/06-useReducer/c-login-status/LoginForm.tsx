import { useState, type FormEvent } from 'react'
import { useReducer } from 'react'

type Props = { login: (email: string, password: string) => Promise<void> }

const reducer=(state: { loading: boolean; error: string | null; success: boolean }, action: { type: 'idle'|'start' | 'success' | 'error'; error?: string }) => {
  switch (action.type) {
    case 'idle':
      return { loading: false, error: null, success: false }
    case 'start':
      return { loading: true, error: null, success: false }
    case 'success':
      return { loading: false, error: null, success: true }
    case 'error':
      return { loading: false, error: action.error || 'Unknown error', success: false }
    default:
      return state
  }
}
export default function LoginForm({ login }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  // const [success, setSuccess] = useState(false)

  const [{ loading, error, success }, dispatch] = useReducer(reducer, { loading: false, error: null, success: false })

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'start' })
    try {
      await login(email, password)
      dispatch({ type: 'success' })
    } catch (err) {
      dispatch({ type: 'error', error: (err as Error).message })
    }
    //dispatch({ type: 'idle' })
  }

  return (
    <form onSubmit={submit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
      {error && <p role="alert">{error}</p>}
      {success && <p>Welcome back!</p>}
    </form>
  )
}
