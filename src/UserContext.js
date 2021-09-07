import React, { useContext, useReducer } from 'react'
import { USER_ACTIONS } from './Constants'
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
      case USER_ACTIONS.NEW_COLLECTION:
        return {...user, collections: [...user.collections, action.payload.newCollectionName] }

      default:
        break;
    }
  }

  const [user, userDispatch] = useReducer(userReducer, {userId: '12345', userName: 'Hamza', collections: ['Group Theory', 'Real Analysis I', 'Complex Analysis II']})

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={userDispatch}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )

}