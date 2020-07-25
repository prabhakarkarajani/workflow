import { appConstants } from "../redux_constants";
var uniqid = require('uniqid');

const initialState = {
    workFlowList: [
        {
            id: uniqid(),
            workFlowTitle: 'WorkFlow 1',
            isCompleted: true,
            tasks: [{
                id: `task_${uniqid()}`,
                title: 'Task 1',
                desc: 'do something text',
                taskStatus: 'completed'
            },
            {
                id: `task_${uniqid()}`,
                title: 'Task 1',
                desc: 'do something text',
                taskStatus: 'completed'
            }]
        },
        {
            id: uniqid(),
            workFlowTitle: 'Work 2',
            isCompleted: false,
            tasks: [{
                id: `task_${uniqid()}`,
                title: 'Task 1',
                desc: 'do something text',
                taskStatus: 'completed'
            },
            {
                id: `task_${uniqid()}`,
                title: 'Task 1',
                desc: 'do something text',
                taskStatus: 'inprogress'
            }]
        }
    ],
    status: ""
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case appConstants.LOAD_WORK_FLOW_SUCCESS: {
            return {
                ...state,
                workFlowList: action.payload,
                status: action.type,
            }
        }
        case appConstants.LOAD_WORK_FLOW: {
            return {
                ...state,
                status: action.type       
            }
        }
        case appConstants.SAVE_WORK_FLOW: {
            return{
                ...state,
                status: action.type,
                workFlowList: action.payload
            }
        }
        case appConstants.UPDATE_WORK_FLOW: {
            return {
                ...state,
                status: action.type,
                workFlowList: action.payload
            }
        }
        case appConstants.RESET_STATUS:
        default: {
            return {
                ...state,
                status: action.type
            }
        }
    }
}

export default appReducer;
