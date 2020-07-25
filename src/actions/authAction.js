import {
    authConstants
} from  '../redux_constants';


function authLogin(payload){
    return {
        type: authConstants.SET_CURRENT_USER,
        payload
    }
}

function authLogout(payload){
    return {
        type: authConstants.RESET_AUTH_STATE,
        payload
    }
}

const authActions = {
    authLogin,
    authLogout
}

export default authActions;