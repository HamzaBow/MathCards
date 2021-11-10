import { fetchUserFromAuthId } from 'api/userAPI'
import { CardInterface } from 'components/cardform/CardForm'
import Card from 'components/cards/Card'
import React, { useContext, useEffect, useReducer } from 'react'
import { USER_ACTIONS } from './../Constants'
import { useAuth } from './AuthContext'
const UserContext = React.createContext({})
const UserUpdateContext = React.createContext({})

export function useUser() {
  return useContext(UserContext)
}

export function useUserUpdate() {
  return useContext(UserUpdateContext)
}

interface Props {
  children: JSX.Element;
}

interface User {
  _id: string | null;
  authId: string | null;
  following: string[];
  ownedCards: CardInterface[]
  collections: string[];
}

enum UserActions {
  FetchUser,
  FetchUserCards,
  FetchUserCollections,
}

interface UserReducerAction {
  type: UserActions;
  payload: any;
}

const UserProvider : React.FC<Props> = ({children}) => {

  function userReducer(user: User, action: UserReducerAction ): User {
    switch (action.type) {
      case UserActions.FetchUser:
        return { ...user, ...action.payload.userFromServer }
      //---------------------------------
      case UserActions.FetchUserCollections:
        return { ...user, collections:  action.payload.userCollectionsFromServer}
      //---------------------------------
      case UserActions.FetchUserCards:
        return { ...user, ...action.payload.userCardsFromServer }
      //---------------------------------
      default:
        return user; 
    }
  }

  const [user, userDispatch] = useReducer(userReducer, {
  _id: null, 
  authId: null,
  following: [],
  ownedCards: [],
  collections: [] 
  } ) 

  const { currentUser } = useAuth()
  useEffect(() => {
    const fetchUser = async () => {
      const userFromServer = await fetchUserFromAuthId(currentUser?.uid)
      userDispatch({type: UserActions.FetchUser, payload: { userFromServer }})
    }
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={userDispatch}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )

}

export default UserProvider;