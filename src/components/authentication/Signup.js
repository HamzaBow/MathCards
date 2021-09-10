import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Redirect, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const { signup, currentUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== passwordConfirm) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(email, password)
      history.push('/')

    } catch (err) {
      setError('Failed to create an account')
      console.error(err);
    }
    setLoading(false)
  }

  return (
    <div style={{ paddingTop: "150px" }}>

      {currentUser ?
        <Redirect to='/' />
        :
        <>
          {error && <h1 style={{ backgroundColor: 'red' }}>{error}</h1>}
          {<h1 style={{ backgroundColor: 'green' }}>{currentUser && 'current user: ' + JSON.stringify(currentUser.email)}</h1>}
          <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
            <input type='password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder='confirm password' />
            <button disabled={loading} type='submit' >submit</button>
            <h2>Already have an account? <Link to='/login'>Log in</Link></h2>
          </form>
        </>
      }
    </div>
  )
}

export default Signup
