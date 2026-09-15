import { useState, useEffect } from 'react'
import RegisterClient from './Components/RegisterClient'
import Login from './Components/Login'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.pathname === '/login' ? 'login' : 'register'
  })

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname === '/login' ? 'login' : 'register')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (page) => {
    window.history.pushState({}, '', page === 'login' ? '/login' : '/register')
    setCurrentPage(page)
  }

  return (
    <>
      {currentPage === 'login' ? (
        <Login onNavigateRegister={() => navigate('register')} />
      ) : (
        <RegisterClient onNavigateLogin={() => navigate('login')} />
      )}
    </>
  )
}

export default App
