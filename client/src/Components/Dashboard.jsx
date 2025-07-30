import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/auth/verify')
        .then(res => {
            if (res.data.stats) {
                console.log('hi');
                
            }
            else {
                navigate('/')
            }
        })
        }, [])
  return (
    <div>
      
    </div>
  )
}

export default Dashboard
