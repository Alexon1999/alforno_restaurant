import React from "react";
import { Route, Redirect } from "react-router-dom";
import useLocalStorageToken from "../../hooks/useLocalstorageToken";

const SecuredRoute = ({ component: Component, ...otherProps }) => {
  const token = useLocalStorageToken();

  return (
    <Route
      {...otherProps}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default SecuredRoute;
