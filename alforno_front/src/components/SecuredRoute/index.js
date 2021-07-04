import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { setAuthToken } from "../../utilities";

const SecuredRoute = ({ component: Component, ...otherProps }) => {
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      setAuthToken(localStorage.jwtToken);
    }
  }, []);

  // console.log(axios.defaults.headers["Authorization"]);

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
