import { useState } from 'react'
import { useContext, createContext } from 'react'
type User = { name: string }
type AuthProps = { user: User | null; onLogin: () => void; onLogout: () => void }

export const AuthContext = createContext<AuthProps>({
  user: null,
  onLogin: () => {},
  onLogout: () => {},
})

function Button() {
  const { user, onLogin, onLogout } = useContext(AuthContext)
  return user ? <button onClick={onLogout}>Log out</button> : <button onClick={onLogin}>Log in</button>
}

function Login() {
  const user=useContext(AuthContext).user
  return (
    <div className="login">
      <Button/>
    </div>
  )
}

function Navbar() {
  const user=useContext(AuthContext).user
  return (
    <nav>
      <span data-testid="greeting">{user ? `Hi, ${user.name}` : 'Hi, guest'}</span>
      <Login/>
    </nav>
  )
}

export default function AuthApp() {
  const [user, setUser] = useState<User | null>(null)
  return  (
    <AuthContext.Provider value={{ user, onLogin: () => setUser({ name: 'Random Person' }), onLogout: () => setUser(null) }}>
      <Navbar />
    </AuthContext.Provider>
  ) 
}
