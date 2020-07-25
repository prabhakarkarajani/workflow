import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    Grid,
    fade,
    makeStyles,
    InputBase,
    Button,
    FormControlLabel,
    Checkbox,
    Card,
    CardContent,
    Typography,
    IconButton
} from '@material-ui/core';
import _ from 'lodash';

import { appConstants } from '../../redux_constants';
import appActions from '../../actions/appAction';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import useOnClickOutside from './use-onclick-outside';
import filterIcon from '../../filter.png';
import { history } from '../../helpers';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';


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
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
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
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        textTransform: 'lowercase',
        fontFamily: 'Arial',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    filterGroup: {
        marginTop: '7pt',
        position: 'relative'
    },
    filterTitle: {
        padding: '6pt 25pt',
        borderRadius: '6px',
        border: '1px solid gainsboro',
        cursor: 'pointer'
    },
    filterIcon: {
        verticalAlign: 'middle',
        paddingRight: '5pt'
    },
    fitlerBox: {
        '&span': {
            fontSize: 14,
            fontWeight: 'normal'
        }
    },
    filterMenu: {
        border: '1px solid gainsboro',
        borderRadius: '6pt',
        boxShadow: '0px 3px 4px rgba(0,0,0,0.2)',
        padding: '10px 15px',
        position: 'absolute',
        zIndex: 2,
        top: '22pt',
        backgroundColor: 'white'
    },
    rightContent: {
        textAlign: 'right',
        paddingRight: '18pt'
    },
    button: {
        backgroundColor: 'green',
        '&:hover': {
            backgroundColor: 'darkGreen'
        }
    },
    listContainer: {
        padding: '20pt'
    },
    cardItem: {
        width: '250pt',
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
        marginTop: '25px'
    },
    cardItemContent: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '50pt'
    },
    cardItemStatus: {
        fontSize: 14,
        fontFamily: 'Arial'
    },

    workFlowStatusBtn: {
        '& svg': {
            fontSize: '1.2rem'
        }
    },
    workFlowEditBtn: {
        backgroundColor: '#90caf9',
        color: 'rgb(66 64 64 / 87%)',
        marginRight: '5px',
        '&:hover': {
            backgroundColor: '#b0d8f9',
        },
        '& svg': {
            fontSize: '1.2rem'
        }
    },

    workFlowDeleteBtn: {
        color: 'white',
        background: 'red',
        position: 'absolute',
        right: '-15px',
        top: '-15px',
        '&:hover': {
            backgroundColor: 'darkRed'
        },

        '& svg': {
            fontSize: '1.2rem'
        }
    },
    active: {
        background: 'green',
        color: 'white',
        '&:hover': {
            backgroundColor: 'darkGreen'
        },
    },
    inactive: {
        background: '#a9a9a9',
        color: 'rgb(66 64 64 / 87%)',
        '&:hover': {
            backgroundColor: '#cecbcb'
        },
    }
}));

function WorkFlow(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(false);
    const [workFlowList, setWorkFlowList] = useState([]);
    const [searchWorkFlowList, setSearchWorkFlowList] = useState([]);
    const ref = useRef();
    
    const [searchInput, setSearchInput] = useState('');;
    const [filter, setFilter] = useState({
        all: true,
        completed: true,
        pending: true,
    });

    
    /**
     *
     *@handler useOnClickOutside is helpes 
     * @param {*} ref, access the dom mode
     */
    useOnClickOutside(ref, () => {
        setAnchorEl(false);
    });
    /**
     *
     *@handler handleMenu - show the filter dropdown data on fitler btn click
     * @param {*} event, [getting current action state]
     */
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    /**
     *
     *@handler filterHander helpes for fitler the work flow data based user selection
     * @param {*} event, type [ selected filter type 'completed', 'pending' or 'all']
     * @returns setFilter - hook for handling the state chagnes
     */
    const fitlerHandler = (e, type) => {
        let tempFilter = _.cloneDeep(filter);
        if (type === 'all') {
            if (e.currentTarget.checked) {
                tempFilter.completed = e.currentTarget.checked;
                tempFilter.pending = e.currentTarget.checked;
                tempFilter.all = e.currentTarget.checked;
            } else {
                tempFilter.all = e.currentTarget.checked;
            }
        } else {
            if (e.currentTarget.checked) {
                if (type === 'completed') {
                    if (tempFilter.pending) {
                        tempFilter.all = e.currentTarget.checked;
                    }
                    tempFilter.completed = e.currentTarget.checked;
                } else {
                    if (tempFilter.completed) {
                        tempFilter.all = e.currentTarget.checked;
                    }
                    tempFilter.pending = e.currentTarget.checked;
                }

            } else {
                tempFilter[type] = e.currentTarget.checked;
                tempFilter.all = e.currentTarget.checked;
            }
        }

        setFilter(prevState => ({
            ...prevState,
            ...tempFilter
        }))
    }

    /**
     *
     *@handler searcHandler - helpers for once the user enter his/her input in search show the respective data in current displayed data
     * @param {*} event, [getting current search input value]
     * @returns setSearchWorkFlowList, setSearchInput - hook for handling the state chagnes
     */
    const searchHandler = (e) => {
        // list filter search handler here
        const searchInput = e.currentTarget.value.toUpperCase();
        const trimed = searchInput.trimStart();
        setSearchInput(trimed);
        const cloneData = _.cloneDeep(workFlowList); // Object.assign([], data);
        const tempSearchData = !_.isEmpty(cloneData) && _.filter(cloneData, (item) => item.workFlowTitle.toUpperCase().indexOf(trimed) > -1);
        setSearchWorkFlowList(tempSearchData);

    };
    /**
     *
     *@handler onStatusChangeHandler - user can change the work flow item status complete to pending || pending to complete
     * @param {*} event, item [getting current selected work flow item ]
     * @returns updateWorkFlow [ dispatch the props to reducer]
     */
    const onStatusChangeHandler = (event, item) => {
        let cloneData = _.cloneDeep(workFlowList);
        const getIdx = _.findIndex(cloneData, { 'id': item.id });
        cloneData[getIdx].isCompleted = !item.isCompleted;
        _.each(cloneData[getIdx].tasks, (t) => {
            t.taskStatus = (cloneData[getIdx].isCompleted ? 'completed' : 'pending');
        })
        props.updateWorkFlow(cloneData)
    }
    /**
     *
     *@handler onDeleteHandler - user can remove the current selected work flow item
     * @param {*} event, item [getting current selected work flow item ]
     * @returns updateWorkFlow [ dispatch the props to reducer]
     */
    const onDeleteHandler = (e, item) => {
        let cloneData = _.cloneDeep(workFlowList);
        const getData = _.filter(cloneData, (n) => (n.id !== item.id));
        props.updateWorkFlow(getData)
    }
    /**
     *
     *@comp cartItem - It is a peace of jsx code snippet and will returns the work flow item 
     * @param {*} data  [work flow list data ]
     * @returns fitleredData  [ filter the data based on current filter inputs]
     */
    const cartItem = (data) => {
        let cloneData = _.cloneDeep(data);
        let filteredData = [];
        if (!filter.all) {
            if (!filter.completed && !filter.pending) {
                const isAnyFilterOptionSelected = Object.values(filter).filter(n => n).length;
                filteredData = (Boolean(isAnyFilterOptionSelected) ? data : []);
            } else {
                if (filter.completed) {
                    filteredData = _.filter(cloneData, { 'isCompleted': true });
                } else {
                    filteredData = _.filter(cloneData, { 'isCompleted': false });
                }
            }
        } else {
            filteredData = data;
        }
        return (!_.isEmpty(filteredData) && filteredData.map((item, idx) => (
            <Card variant="outlined" className={clsx(classes.cardItem)} key={item.id}>
                <CardContent>
                    <Typography variant="overline" color="textSecondary" gutterBottom className={clsx(classes.cardItemTitle)}>
                        {item.workFlowTitle}
                    </Typography>
                    <IconButton
                        className={classes.workFlowDeleteBtn}
                        onClick={(event) => { onDeleteHandler(event, item) }}
                    >
                        <DeleteRoundedIcon />
                    </IconButton>
                    <br />
                    <div className={clsx(classes.cardItemContent)}>
                        <Typography variant="overline" color="textSecondary" gutterBottom className={clsx(classes.cardItemStatus)}>
                            {item.isCompleted ? 'Completed' : 'Pending'}
                        </Typography>
                        <div>
                            <IconButton
                                className={classes.workFlowEditBtn}
                                onClick={() => {
                                    history.push({
                                        pathname: '/createWorkFlow',
                                        state: item.id
                                    })
                                }}
                            >
                                <EditOutlinedIcon />
                            </IconButton>
                            <IconButton
                                className={`${classes.workFlowStatusBtn} ${item.isCompleted ? classes.active : classes.inactive}`}
                                onClick={(event) => { onStatusChangeHandler(event, item) }}
                            >
                                <CheckOutlinedIcon />
                                {/* <CheckCircleRoundedIcon /> */}
                            </IconButton>
                        </div>

                    </div>
                </CardContent>
            </Card>)));
    }
    /**
     *
     *@hook on component load it will render 
     * @param {*} workFlowData  [data getting from store ]
     * @returns setWorkFlowList  -hook for handling the state chagnes
     */
    useEffect(() => {
        if (!_.isEmpty(props.workFlowData)) {
            setWorkFlowList(props.workFlowData);
        }
    }, []);

    /**
     *
     *@hook It's a hook and will invoke while props.status changes
     */
    useEffect(() => {
        switch (props.status) {
            case appConstants.UPDATE_WORK_FLOW:
                setWorkFlowList(props.workFlowData);
                props.resetStatus();
                break;
            default: break;
        }
    }, [props.status])

    return (
        <React.Fragment>
            <Grid container className={classes.root}>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={4}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        // root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={searchInput}
                                    onChange={(event) => { searchHandler(event) }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <div variant="contained" className={clsx(classes.filterGroup)}>
                                <span onClick={handleMenu} className={clsx(classes.filterTitle)}>
                                    <img src={filterIcon} className={clsx(classes.filterIcon)} alt="filter Icon" />
                                    Filter</span>

                                {anchorEl &&
                                    <div ref={ref} className={clsx(classes.filterMenu)}>
                                        <div className={clsx(classes.fitlerBox)}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={filter.all}
                                                        onChange={(event) => { fitlerHandler(event, 'all') }}
                                                        name="all"
                                                        color="primary"
                                                    />
                                                }
                                                label="All"
                                                disabled={((filter.completed && filter.pending) ? true : false)}
                                            />
                                        </div>

                                        <div className={clsx(classes.fitlerBox)}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={filter.completed}
                                                        onChange={(event) => { fitlerHandler(event, 'completed') }}
                                                        name="completed"
                                                        color="primary"
                                                    />
                                                }
                                                label="Completed"
                                            />
                                        </div>

                                        <div className={clsx(classes.fitlerBox)}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={filter.pending}
                                                        onChange={(event) => { fitlerHandler(event, 'pending') }}
                                                        name="pending"
                                                        color="primary"
                                                    />
                                                }
                                                label="Pending"

                                            />
                                        </div>
                                    </div>}
                            </div>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={4} className={clsx(classes.rightContent)}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddIcon />}
                        onClick={() => { history.push('/createWorkFlow') }}
                    >
                        Create WorkFlow
                  </Button>
                </Grid>
            </Grid>
            <Grid container className={clsx(classes.listContainer)}>
                {_.isEmpty(searchInput) ? cartItem(workFlowList) : cartItem(searchWorkFlowList)}

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
export default connect(mapStateToProps, mapDispatchToProps)(WorkFlow);