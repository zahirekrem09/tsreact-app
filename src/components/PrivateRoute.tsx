import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>;
}

const PrivateRoute = ({ component: Componemt, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = localStorage.getItem("token");
        if (token) {
          return <Componemt {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
