import React, { useState } from 'react'
import useGlobalContext from '../context/GlobalContext'
import { Link } from 'react-router-dom'

const Signup = () => {

  const { handleSignup } = useGlobalContext()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  return (
    <div className='user-form-container'>
      <form className='user-form' onSubmit={(e)=>handleSignup(e,username,password)}>
        <h2>Sign up</h2>
        <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
        <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <button>Sign up</button>
        <Link to='/login'>Already A User ?</Link>
      </form>
    </div>
  )
}

export default Signup