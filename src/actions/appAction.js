import { appConstants } from "../redux_constants";

function updateWorkFlow_action(payload) {
    return {
        type: appConstants.UPDATE_WORK_FLOW,
        payload
    }
}

function resetStatus_action() {
    return {
        type: appConstants.RESET_STATUS
    }
}

const appActions = {
    updateWorkFlow_action,
    resetStatus_action
}
export default appActions;