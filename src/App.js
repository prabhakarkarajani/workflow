import React from 'react';
import { Router as BrowserRouter, Route } from "react-router-dom";
import { routes } from "./routes";
import { history as browserHistory } from "./helpers";

function App() {
  return (
    <BrowserRouter history={browserHistory}>
    <Route>{routes}</Route>
  </BrowserRouter>
  );
}

export default App;
