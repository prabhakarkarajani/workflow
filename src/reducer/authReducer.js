import { authConstants } from "../redux_constants";

export const initialState = {
  currentUser: {},
  status: ""
};

const authReducer = (state = initialState, action) =>{
    switch (action.type) {
      case authConstants.SET_CURRENT_USER:{
          return {
              ...state,
              currentUser: action.payload,
              status: action.type,
          }
      }
      case authConstants.RESET_AUTH_STATE:{
          return{
              ...state,
              status:'',
              currentUser: {}
          }
      }
     default:{
         
     }
    }
    return state;
}

export default authReducer;
