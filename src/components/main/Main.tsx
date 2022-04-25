import React from "react";
import CardsList from "./CardsList";
// import { Redirect } from "react-router";
// import { useAuth } from "../../contexts/AuthContext";

const Main : React.FC = () => {
//   const { currentUser } = useAuth() || { currentUser: undefined }
  return (
    <main>
      {/* {currentUser ? */}
        <>
          <CardsList />
        </>
        {/* :
        <Redirect to='/login' />
      } */}
    </main>
  );
};

export default Main;
