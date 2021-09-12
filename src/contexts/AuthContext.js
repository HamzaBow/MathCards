import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signInWithGoogleAuth() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      // .then((result) => {
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      //   const token = credential.accessToken;
      //   // The signed-in user info.
      //   const user = result.user;
      //   // ...
      // })
      // .catch((error) => {
      //   // Handle Errors here.
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   // The email of the user's account used.
      //   const email = error.email;
      //   // The AuthCredential type that was used.
      //   const credential = GoogleAuthProvider.credentialFromError(error);
      //   // ...
      // });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  });

  const value = {
    currentUser,
    signup,
    signInWithGoogleAuth,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
