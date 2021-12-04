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
        return currentUser ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    >

    </Route>
  )
}

export default PrivateRoute
