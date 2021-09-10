import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const { login, currentUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(email, password)
      history.push('/')

    } catch(err)  {
      setError('Failed to create an account')
      console.error(err);
    }
    setLoading(false)
  }

  return (
    <div style={{ paddingTop: "150px" }}>

      {error && <h1 style={{backgroundColor: 'red'}}>{error}</h1>}
      {<h1 style={{backgroundColor: 'green'}}>{ currentUser && 'current user: '+JSON.stringify(currentUser.email)}</h1>}
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <button disabled={loading} type='submit' >submit</button>
        <h2>Don't have an account? <Link to='/signup'>Sign Up</Link></h2>
      </form>
    </div>
  )
}

export default Login
