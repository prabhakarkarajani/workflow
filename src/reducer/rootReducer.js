import { combineReducers } from "redux";
// import authReducer from "./authReducer";
import appReducer from "./appReducer";

const rootReducer = combineReducers({ 
    // authReducer, 
    appReducer 
});

export default rootReducer;
