import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Redirect, useHistory } from 'react-router'
import { Link } from 'react-router-dom'


const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const { resetPassword, currentUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError('')
      setMessage('')
      setLoading(true)
      await resetPassword(email)
      setMessage('Check your email for further instructions')
      // history.push('/')

    } catch (err) {
      setError('Failed to reset password')
      console.error(err);
    }
    setLoading(false)
  }

  return (
    <div style={{ paddingTop: "150px" }}>
      { currentUser ?
      <Redirect to='/' />
      :
      <>
        {error && <h1 style={{ backgroundColor: 'red' }}>{error}</h1>}
        {message && <h1 style={{ backgroundColor: 'lightgreen' }}>{message}</h1>}
        {<h1 style={{ backgroundColor: 'green' }}>{currentUser && 'current user: ' + JSON.stringify(currentUser.email)}</h1>}
        <form onSubmit={handleSubmit}>
          <h1>Password Reset</h1>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
          <button disabled={loading} type='submit' >Reset</button>
          <h2><Link to='/login'>Login</Link></h2>
        </form>
      </>
      }

    </div>
  )
}

export default ForgotPassword