import { useContext } from 'react'
import UserContext from '../context/UserContext'

// function Home({ user, logout }: Props) {
function Home() {
  const { user } = useContext(UserContext)

  return (
    <>
      <div>{user ? <h1>Welcome back {user.username}</h1> : null}</div>
    </>
  )
}

export default Home
