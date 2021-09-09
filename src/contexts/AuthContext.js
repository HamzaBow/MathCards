import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from '@firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  console.log(`currentUser`, currentUser)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    })
    return unsubscribe
  })


  const value = {
    currentUser,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
