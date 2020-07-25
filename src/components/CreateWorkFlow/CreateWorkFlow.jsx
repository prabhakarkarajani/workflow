import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    Grid,
    fade,
    makeStyles,
    InputBase,
    Button,
    Card,
    CardContent,
    Typography,
    IconButton,
    TextareaAutosize
} from '@material-ui/core';
import _ from 'lodash';
import { history } from '../../helpers';
import uniqId from 'uniqid';

import appActions from '../../actions/appAction';
import AddIcon from '@material-ui/icons/Add';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '20pt',
        paddingBottom: '20pt',
        borderBottom: '1px solid gainsboro',
        boxShadow: '0px 3px 4px rgba(0,0,0,0.2)',
    },
    grow: {
        flexGrow: 1,
    },

    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    wokrFlowTitle: {
        position: 'relative',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        borderRadius: '6px',
        border: '1px solid gainsboro'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontFamily: 'Arial',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        color: '#333'
    },
    rightContent: {
        textAlign: 'right',
        paddingRight: '18pt'
    },
    button: {
        marginLeft: '10px',
        fontSize: 14,
    },
    suffle: {
        backgroundColor: 'purple',
        '&:hover': {
            backgroundColor: '#5f155f'
        }
    },
    delete: {
        marginLeft: '10px',

    },
    add: {
        backgroundColor: 'green',
        marginLeft: '10px',
        '&:hover': {
            backgroundColor: 'darkGreen'
        }
    },
    taskContainer: {
        padding: '20pt'
    },
    cardItem: {
        width: '200pt',
        margin: '10pt',
        position: 'relative',
        overflow: 'inherit',
    },
    cardItemTitle: {
        fontSize: 14,
        textAlign: 'center',
        width: '100%',
        display: 'inline-block',
        border: '1px solid gainsboro',
        boxShadow: '0px 1px 0px rgba(0,0,0,0.2)',
        marginTop: '25px',
        color: '#333'
    },
    cardItemContent: {
        marginTop: '5pt',
        minHeight: '350px',
        width: '100%',
        fontFamily: 'Arial',
        borderColor: 'gainsboro',
        color: '#333',
        fontSize: 14
    },
    cardItemStatus: {
        fontSize: 14,
        fontFamily: 'Arial'
    },
    workFlowStatusBtn: {
        position: 'absolute',
        color: 'white',
        right: '-15px',
        top: '-15px',
        '& svg': {
            fontSize: '1.5rem'
        }
    },
    completed: {
        background: 'green',
        '&:hover': {
            backgroundColor: 'darkGreen'
        },
    },
    pending: {
        background: '#a9a9a9',
        '&:hover': {
            backgroundColor: '#807e7e'
        },
    },
    inprogress: {
        background: '#3f51b5',
        '&:hover': {
            backgroundColor: 'darkBlue'
        },
    }
}));
function CreateWorkFlow(props) {
    const classes = useStyles();
    const [isAllTasksCompleted, setIsAllTasksCompleted] = useState(false);
    const [workFlowTitle, setWorkFlowTitle] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [workFlowObj, setWorkFlowObj] = useState({});
    /**
     *
     *@handler shuffleHandler - shuffle the task items 
     * @param {*} before making change  clone the taskList
     * @returns setTaskList - hook for update the state
     */
    const shuffleHandler = () => {
        const cloneTaskList = _.cloneDeep(taskList);
        setTaskList(cloneTaskList.sort(() => Math.random() - 0.5))
    }
    /**
     *
     *@handler addNodeHandler on add button click generate a new task item
     * @param {*} event, type [ selected filter type 'completed', 'pending' or 'all']
     * @returns setTaskList, setIsAllTasksCompleted - hook for handling the state chagnes
     */
    const addNodeHandler = () => {
        const obj = {
            id: `task_${uniqId()}`,
            title: 'Task 1',
            desc: 'do something text',
            taskStatus: 'pending'
        };
        const cloneTaskList = _.cloneDeep(taskList);
        cloneTaskList.push(obj);
        setTaskList(cloneTaskList);
        setIsAllTasksCompleted(false);
    }
/**
     *
     *@handler deleteNodeHandler helpes for remove the last node item in task list
     * @method {*} with help of slice remove the last item
     * @returns setIsAllTasksCompleted, setTaskList - hook for handling the state chagnes
     */
    const deleteNodeHandler = () => {
        let cloneTaskList = _.cloneDeep(taskList);
        if (!_.isEmpty(cloneTaskList)) {
            cloneTaskList = cloneTaskList.slice(0, cloneTaskList.length - 1)
        } else {
            setIsAllTasksCompleted(false);
        }
        setTaskList(cloneTaskList)
    }
    /**
     *
     *@handler onSaveHandler helpes for if it new item add this item to work flow list 
     * @updaet {*} if its exiting item update the workflow
     * @returns updateWorkFlow - action dispatch 
     * @navigate redirect to work flow item view
     */
    const onSaveHandler = () => {
        const cloneData = _.cloneDeep(props.workFlowData);
        if (!_.isEmpty(taskList)) {
            const obj = {
                id: (workFlowObj || {}).id || uniqId(),
                workFlowTitle: workFlowTitle,
                isCompleted: isAllTasksCompleted,
                tasks: taskList
            }

            if (_.isEmpty(workFlowObj)) {
                cloneData.push(obj);
            } else {
                const getIdx = _.findIndex(cloneData, { 'id': workFlowObj.id });
                if (getIdx !== -1) {
                    cloneData[getIdx] = obj;
                }
            }
        }
        props.updateWorkFlow(cloneData);
        history.push('/');
    }
    /**
     *
     *@handler onStatusChangeHandler - user can change the task item statu on tick mark button click
     * @param {*} event, type [ selected filter type 'completed', 'pending' or 'all']
     * @returns setIsAllTasksCompleted , setTaskList- hook for handling the state chagnes
     */
    const onStatusChangeHandler = (e, item) => {
        let cloneData = _.cloneDeep(taskList);
        const getIdx = _.findIndex(cloneData, { 'id': item.id });
        if (item.taskStatus === 'pending') {
            cloneData[getIdx].taskStatus = 'inprogress';
        } else if (item.taskStatus === 'inprogress') {
            cloneData[getIdx].taskStatus = 'completed'
        } else {
            cloneData[getIdx].taskStatus = 'pending';
            setIsAllTasksCompleted(false);
        }

        // suffle show and logic here
        const getCompletedTaskLength = _.filter(cloneData, { 'taskStatus': 'completed' }).length;
        if (getCompletedTaskLength === cloneData.length) {
            setIsAllTasksCompleted(true);
        }
        setTaskList(cloneData);
    }
    /**
     *
     *@handler onchangeHandler - update the changes from current item in tasklist
     * @param {*} event, id, type [ event getting current value of input item, id stands for cuurent item id, type is holding type element 'input' or 'text area']
     * @returns setTaskList - hook for handling the state chagnes
     */
    const onchangeHandler = (e, id, type) => {
        let cloneData = _.cloneDeep(taskList);
        const getIdx = _.findIndex(cloneData, { 'id': id });
        cloneData[getIdx][type] = e.currentTarget.value;
        setTaskList(cloneData);
    }
    /**
     *
     *@comp taskItem - It is a peace of jsx code snippet and will returns the collection of taskitems
     * @param {*} data  [tasks list data ]
     */
    const TaskItem = (data) => {
        return (!_.isEmpty(data) && data.map((item, idx) => (
            <Card variant="outlined" className={clsx(classes.cardItem)} key={item.id}>
                <CardContent>
                    <Typography variant="overline" color="textSecondary" gutterBottom className={clsx(classes.cardItemTitle)}>
                        <InputBase
                            placeholder="Your task title here"
                            classes={{
                                input: classes.inputInput,
                            }}
                            value={item.title}
                            defaultValue="Your Task here"
                            onChange={(event) => { onchangeHandler(event, item.id, 'title') }}
                            inputProps={{ 'aria-label': 'Your Work Flow Title' }}
                        />
                    </Typography>
                    <IconButton
                        className={`${classes.workFlowStatusBtn} ${classes[item.taskStatus]}`}
                        onClick={(event) => { onStatusChangeHandler(event, item) }}
                    >
                        <CheckOutlinedIcon />
                    </IconButton>
                    <br />
                    <div className={clsx(classes.cardItemContent)}>
                        <TextareaAutosize
                            className={clsx(classes.cardItemContent)}
                            rowsMax={4}
                            aria-label="maximum height"
                            placeholder="Your task description here"
                            value={item.desc}
                            defaultValue="Your Task Description here"
                            onChange={(event) => { onchangeHandler(event, item.id, 'desc') }}
                        />
                    </div>
                </CardContent>
            </Card >)))

    }

     /**
     *
     *@hook It's a hook and invoke while history changes
      */
    useEffect(() => {
        if (!_.isEmpty(props.workFlowData) && props.history.location.state) {

            const data = _.filter(props.workFlowData, { id: props.history.location.state })[0];
            if (!_.isEmpty(data)) {
                const getCompletedTaskLength = _.filter(data.tasks, { 'taskStatus': 'completed' }).length;
                if (getCompletedTaskLength === data.tasks.length) {
                    setIsAllTasksCompleted(true);
                }
                setWorkFlowObj(data);
                setWorkFlowTitle(data.workFlowTitle);
                setTaskList(data.tasks);
            }
        }
    }, [props.history]);

    return (
        <React.Fragment>
            <Grid container className={classes.root}>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={4}>
                            <div className={classes.wokrFlowTitle}>
                                <InputBase
                                    placeholder="Your Work Flow Title"
                                    classes={{
                                        input: classes.inputInput,
                                    }}
                                    value={workFlowTitle}
                                    onChange={(event) => { setWorkFlowTitle(event.currentTarget.value) }}
                                    inputProps={{ 'aria-label': 'Your Work Flow Title' }}
                                />
                            </div>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={6} className={clsx(classes.rightContent)}>
                    {isAllTasksCompleted &&
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.suffle}
                            onClick={shuffleHandler}
                        >
                            Suffle
                  </Button>}
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.delete}
                        startIcon={<DeleteRoundedIcon />}
                        onClick={deleteNodeHandler}
                        disabled={_.isEmpty(taskList)}
                    >
                        Delete
                  </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.add}
                        startIcon={<AddIcon />}
                        onClick={addNodeHandler}
                    >
                        Add Node
                  </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveOutlinedIcon />}
                        onClick={onSaveHandler}
                        disabled={_.isEmpty(taskList)}
                    >
                        {!_.isEmpty(workFlowObj) ? 'Update' : 'Save'}
                    </Button>
                </Grid>
            </Grid>
            <Grid container className={clsx(classes.taskContainer)}>
                {TaskItem(taskList)}
            </Grid>
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        workFlowData: state.appReducer.workFlowList,
        status: state.appReducer.status
    }
};

const mapDispatchToProps = dispatch => ({
    updateWorkFlow: (data) => {
        dispatch(appActions.updateWorkFlow_action(data));
    },
    resetStatus: () => {
        dispatch(appActions.resetStatus_action())
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkFlow);