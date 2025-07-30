import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(res => {
        if (res.data.status) {
          navigate('/login')
        }
      })
      .catch(err => {
        console.error('Logout failed:', err)
      })
  }
  return (
    <div>
      <button><Link to='/dashboard'>Dashboard</Link></button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
