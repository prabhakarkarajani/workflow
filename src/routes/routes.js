import React  from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import { PublicRoute } from "../components/PublicRoute";

import Login from '../components/Login';
import WorkFlow from '../components/WorkFlow';
import CreateWorkFlow from '../components/CreateWorkFlow';
export const routes = (
   <Switch>
      <PrivateRoute exact path="/" component={WorkFlow} />
      <PublicRoute exact path="/login" component={Login} />
      <PrivateRoute exact path="/createWorkFlow" component={CreateWorkFlow} />
    </Switch>
);
