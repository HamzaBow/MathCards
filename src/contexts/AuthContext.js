import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@firebase/auth';

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

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth) 
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
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
    signup,
    login,
    logout,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
