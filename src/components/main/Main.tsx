import React, { useEffect } from "react";
import CardsList from "./CardsList";
import { Redirect } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import { CardInterface } from '../cardform/CardForm'

import { Action } from "../../App"

export interface Props {
  cards: CardInterface[];
  cardsDispatch: React.Dispatch<Action> 
}

const Main : React.FC<Props> = ({ cards, cardsDispatch }) => {
  const { currentUser } = useAuth() || { currentUser: undefined }
  return (
    <main>
      {currentUser ?
        <CardsList cards={cards} cardsDispatch={cardsDispatch} />
        :
        <Redirect to='/login' />
      }
    </main>
  );
};

export default Main;
