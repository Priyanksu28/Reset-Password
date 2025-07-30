import React, { useState } from 'react'
import '../App.css'
import Axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/auth/login', { 
            email, 
            password
        }).then(response => {
          if (response.data.status) {
            navigate('/');
          }     
        }).catch(err => {
            console.log(err);
        })
    }
  return (
    <div className='sign-up-container'>
      <h2>Login</h2>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        
        <label htmlFor="email">Email</label>
        <input type="email" autoComplete='off' placeholder='email'
        onChange={(e) => setEmail(e.target.value)}/>
        
        <label htmlFor="password">Password</label>
        <input type="password" placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}/>

        <button type='submit'>Login</button>
        <Link to='/forgot-Password'>Forgot Password ?</Link>
        <p>Don't have an account ?</p> <Link to='/signup'>Signup</Link>
      </form>
    </div>
  )
}

export default Login
