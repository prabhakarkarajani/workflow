import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../../logo.png';
import { history } from '../../helpers';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    headerContainer: {
        backgroundColor: '#a901b0'
    },
    logo: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        width: 32
    },
    title: {
        flexGrow: 1,
    },
    goBack: {
        marginRight: '5px'
    }
}));
function Header(props) {
    const classes = useStyles();
    /**
     *
     *@handler onLogoutHandler - redirect to login page
     * @storage {*} remove the user info in local storage
     * @redirect history.push helps to navigate to desired location
     */
    const onLogoutHandler = () => {
        localStorage.removeItem('user');
        history.push('/')
    }
    const show = (history.location && history.location.pathname === '/createWorkFlow')
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.headerContainer}>
                <Toolbar>
                    <img src={logo} alt="logo.png" className={classes.logo} />
                    <Typography variant="h6" className={classes.title}>
                        FLOW APP
            </Typography>
                   {show && 
                    (<Button color="default" variant="contained" onClick={()=>{ history.push('/')}} className={classes.goBack}>Go Back</Button>)}
                    <Button color="default" variant="contained" onClick={onLogoutHandler}>Log out</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;





