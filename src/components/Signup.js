import React, { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
       <h1>Sign up</h1>
       <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
       <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
       <button type='submit'>submit</button>
    </div>
  )
}

export default Signup
