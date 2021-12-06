import { fetchCollectionsForUser } from "api/collectionAPI";
import { fetchUserFromAuthId } from "api/userAPI";
import { CardInterface } from "components/cardform/CardForm";
import React, { useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const UserContext = React.createContext({});
const UserUpdateContext = React.createContext({});

interface Props {
  children: JSX.Element;
}

export interface Collection {
  _id: string;
  title: string;
  ownerId: string;
  cardsIds?: string[];
  tags?: string[];
}

export interface User {
  _id: string;
  authId: string;
  following?: string[];
  ownedCards?: CardInterface[];
  collections?: Collection[];
}

export enum UserActions {
  FetchUser,
  FetchUserCards,
  FetchUserCollections,
  AddCollection,
  AddCardIdToCollection,
  ResetUser,
}

interface UserReducerAction {
  type: UserActions;
  payload?: any;
}

export function useUser(): User {
  return useContext(UserContext) as User;
}

export function useUserUpdate(): React.Dispatch<UserReducerAction> {
  return useContext(UserUpdateContext) as React.Dispatch<UserReducerAction>;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  function userReducer(user: User, action: UserReducerAction): User {
    switch (action.type) {
      case UserActions.FetchUser:
        return { ...user, ...action.payload.userFromServer };
      //---------------------------------
      case UserActions.FetchUserCollections:
        return {
          ...user,
          collections: action.payload.userCollectionsFromServer,
        };
      //---------------------------------
      case UserActions.FetchUserCards:
        return { ...user, ...action.payload.userCardsFromServer };
      //---------------------------------
      case UserActions.AddCollection:
        const collections = user.collections === undefined ? [] : user.collections
        return {
          ...user,
          collections: [...collections, action.payload.newCollection],
        };
      //---------------------------------
      case UserActions.AddCardIdToCollection:
        const updatedCollections = user.collections?.map((col: Collection) => {
          if(col._id === action.payload.collectionId){
            let cardsIds = col.cardsIds
            if(col.cardsIds === undefined) {
              cardsIds = []
            }
            return {...col, cardsIds: [...(cardsIds as string[]), action.payload.cardId ]}
          }
          return col;
        })
        return {
          ...user,
          collections: updatedCollections,
        }
      //---------------------------------
      case UserActions.ResetUser:
        return {
          _id: "",
          authId: "",
          following: undefined,
          ownedCards: undefined,
          collections: undefined,
        };
      default:
        return user;
    }
  }

  const [user, userDispatch] = useReducer(userReducer, {
    _id: "",
    authId: "",
    following: undefined,
    ownedCards: undefined,
    collections: undefined,
  });

  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) return
    const fetchUser = async () => {
      if (user._id !== "") return
      const userFromServer = await fetchUserFromAuthId(currentUser?.uid);
      userDispatch({
        type: UserActions.FetchUser,
        payload: { userFromServer },
      });
      const collections = await fetchCollectionsForUser(userFromServer._id);
      userDispatch({
        type: UserActions.FetchUserCollections,
        payload: { userCollectionsFromServer: collections },
      });
    }
    fetchUser();
  }, [currentUser]);

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={userDispatch}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
