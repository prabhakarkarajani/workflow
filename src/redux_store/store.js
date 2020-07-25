import { createStore, compose } from "redux";
import { rootReducer } from "../reducer"
// import createSagaMiddleware from "redux-saga";
// import { rootSaga } from "redux_sagas";

// const sagaMiddleWare = createSagaMiddleware();

// const middleware = applyMiddleware(sagaMiddleWare);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  // const store = createStore(rootReducer, composeEnhancers(middleware));
  const store = createStore(rootReducer, composeEnhancers());
  // sagaMiddleWare.run(rootSaga);

  return store;
};

export default configureStore;
