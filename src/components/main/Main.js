import React, { useEffect } from "react";
import CardsList from "./CardsList";
import { Redirect } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const Main = ({ cards, cardsDispatch }) => {
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
