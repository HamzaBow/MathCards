import React, { useContext, useEffect, useReducer } from 'react'
import { USER_ACTIONS } from './../Constants'
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
  _id: string;
  uid: string;
  following: string[];
  collectionsIds: string[];
}

enum UserReducerActionTypes {
  FetchUser,
  FetchUserCollections,
}

interface UserReducerActions {
  type: UserReducerActionTypes;
  payload: any;
}

const UserProvider : React.FC<Props> = ({children}) => {

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
    const res = await fetch(`${process.env.REACT_APP_API_URL}/collections`);
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

export default UserProvider;