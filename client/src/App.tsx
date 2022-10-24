import { useContext, useEffect } from 'react'
import { UserProvider } from './context/UserContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import Components
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

// Import Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// Import Context
import UserContext from './context/UserContext'

function App() {
  const { getUser } = useContext(UserContext)

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute redirectPath='/login'>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
