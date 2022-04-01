import { useAuth } from 'contexts/AuthContext';
import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

type Props = {
  children: JSX.Element;
} & RouteProps;

const PrivateRoute: React.FC<Props> = ({ children, ...rest}) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={() =>{
        if (!currentUser) {
          return <Redirect to="/login" />;
        }
        if (currentUser && !currentUser.emailVerified) {
          return <Redirect to="/email-not-verified" />;
        }
        return children;
      }}
    >

    </Route>
  )
}

export default PrivateRoute
