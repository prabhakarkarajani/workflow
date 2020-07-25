import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Layout } from "../Layout";

const PrivateRoute = props => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (localStorage.getItem("user")) {
          return (
            <Layout>
              <Component {...routeProps} />
            </Layout>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: routeProps.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
