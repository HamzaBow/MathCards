import React, { useContext, useEffect, useReducer } from 'react'
import { USER_ACTIONS } from './../Constants'
const UserContext = React.createContext()
const UserUpdateContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function useUserUpdate() {
  return useContext(UserUpdateContext)
}

export function UserProvider({ children }) {

  function userReducer(user, action){
    switch (action.type) {
      case USER_ACTIONS.FETCH_COLLECTIONS:
        return {...user, collections: action.payload.collectionsFromServer};
      case USER_ACTIONS.NEW_COLLECTION:
        return {...user, collections: [...user.collections, action.payload.newCollection] }
      default:
        break;
    }
  }

  const [user, userDispatch] = useReducer(userReducer, {userId: '12345', userName: 'Hamza', collections: ['Group Theory', 'Real Analysis I', 'Complex Analysis II']})

  useEffect(() => {
    const getCollections = async () => {
      const collectionsFromServer = await fetchCollections(); 
      userDispatch({type: USER_ACTIONS.FETCH_COLLECTIONS, payload: { collectionsFromServer }})
    } 
    getCollections();
  }, [])

  const fetchCollections = async () => {
    const res = await fetch('http://localhost:5000/collections');
    const data = res.json();
    return data;
  }

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={userDispatch}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )

}