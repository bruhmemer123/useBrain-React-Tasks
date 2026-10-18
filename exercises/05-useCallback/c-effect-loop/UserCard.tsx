import { use } from 'marked';
import { useEffect, useState,useCallback } from 'react'

export type User = { id: number; name: string }

type Props = {
  userId: number
  fetchUser: (id: number) => Promise<User>
}

export default function UserCard({ userId, fetchUser }: Props) {
  const [user, setUser] = useState<User | null>(null)

  const load = useCallback( () => {
    fetchUser(userId).then(setUser)
  }, [userId, fetchUser])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div>
      <p data-testid="name">{user ? user.name : 'Loading...'}</p>
      <button onClick={load}>Refresh</button>
    </div>
  )
}
