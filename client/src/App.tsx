import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  interface User {
    username: string
  }
  const [user, setUser] = useState<User | null>(null)

  const register = () => {
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/register',
    }).then((res) => console.log(res))
  }

  const login = () => {
    axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/login',
    }).then((res) => {
      console.log(res.data)

      // Refresh Page
      window.location.reload()
    })
  }

  const logout = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout',
    }).then((res) => {
      setUser(null)
      // console.log(res.data)

      // Refresh Page
      window.location.reload()
    })
  }

  const getUser = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user',
    }).then((res) => {
      setUser(res.data)
      // console.log(res.data)
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <div>
        <h1>Register</h1>
        <input
          type='text'
          placeholder='username'
          onChange={(e) => setRegisterUsername(e.target.value)}
          value={registerUsername}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => setRegisterPassword(e.target.value)}
          value={registerPassword}
        />
        <button onClick={register}>Register</button>
      </div>
      <div>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='username'
          onChange={(e) => setLoginUsername(e.target.value)}
          value={loginUsername}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => setLoginPassword(e.target.value)}
          value={loginPassword}
        />
        <button onClick={login}>Login</button>
      </div>

      <div>
        <h1>Logout</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <div>{user ? <h1>Welcome back, {user.username}.</h1> : null}</div>
    </>
  )
}

export default App
