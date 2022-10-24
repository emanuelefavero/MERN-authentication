import { useState, createContext } from 'react'
import axios from 'axios'

// ---------- INTERFACES ----------
import UserInterface from '../interfaces/UserInterface'

// ---------- CONTEXT ----------
const UserContext = createContext({
  user: {} as UserInterface | null,
  registerUsername: '',
  setRegisterUsername: (username: string) => {},
  registerPassword: '',
  setRegisterPassword: (password: string) => {},
  loginUsername: '',
  setLoginUsername: (username: string) => {},
  loginPassword: '',
  setLoginPassword: (password: string) => {},
  register: () => {},
  login: () => {},
  logout: () => {},
  getUser: () => {},
})

// const UserContext = createContext<UserContextInterface>({})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null)

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const register = () => {
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/register',
    }).then((res) => console.log(res.data))
  }

  const login = async () => {
    await axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/login',
    }).then((res) => {
      console.log(res.data)

      // setUser(res.data)
      // window.location.reload()
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
      // window.location.reload()
    })
  }

  const getUser = async () => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user',
    }).then((res) => {
      if (res.data) {
        setUser(res.data)
      } else {
        setUser(null)
      }

      // setUser(res.data)
      // console.log(res.data)
    })
  }

  // ---------- RETURN ----------
  return (
    <UserContext.Provider
      value={{
        user,
        registerUsername,
        setRegisterUsername,
        loginUsername,
        setLoginUsername,
        registerPassword,
        setRegisterPassword,
        loginPassword,
        setLoginPassword,
        register,
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
