import React, { useState } from 'react'
import useGlobalContext from '../context/GlobalContext'
import { Link } from 'react-router-dom'

const Login = () => {

  const { handleLogin } = useGlobalContext()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  return (
    <div className='user-form-container'>
      <form className='user-form' onSubmit={(e)=>handleLogin(e,username,password)}>
        <h2>Login</h2>
        <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button>Login</button>
        <Link to='/signup'>New User ?</Link>
      </form>
    </div>
  )
}

export default Login