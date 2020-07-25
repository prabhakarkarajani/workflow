import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = props => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={routeProps =>
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).apiKey ? (
          <Redirect
            to={{ pathname: "/", state: { from: routeProps.location } }}
          />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  );
};

export default PublicRoute;
