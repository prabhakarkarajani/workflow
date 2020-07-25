import React, { useState } from 'react';
import clsx from 'clsx';
import {
    Container,
    Grid,
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    InputAdornment,
    Link,
    TextField,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from "yup";
import { history } from '../../helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginTop: '100pt',
        padding: '20pt 10pt'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '90%'
    },
    loginTitle: {
        marginBottom: '25pt'
    },
    rememberMe: {
        textAlign: 'left',
        paddingLeft: '20pt',
        marginTop: '10pt'

    },
    loginBtn: {
        margin: '10pt 20pt 0',
        width: '90%'
    },
    signup: {
        marginTop: '10pt',
        color: '#3f51b5',
        fontSize: 14,
        fontWeight: 'normal',
        '&span': {

        }
    }
}));



function Login() {
    const classes = useStyles();
    const [isRememberMe, setIsRememberMe] = useState(false);
    const preventDefault = (event) => event.preventDefault();
    return (
        <Container maxWidth="sm" >
            <Grid item xs={12} style={{ textAlign: "center", verticalAlign: "middle" }}>
                <Card className={classes.root} variant="outlined">
                    <Typography variant="h6" gutterBottom className={clsx(classes.loginTitle)}>
                        Login
                    </Typography>
                    <CardContent>
                        <Formik
                            initialValues={{ email: '', password: '', remember: false }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);
                                localStorage.setItem('user', JSON.stringify(values));
                                history.push('/')
                            }
                            }
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email()
                                    .required('Email is required'),
                                password: Yup.string()
                                    .required('Password is required'),
                            })}
                        >
                            {(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                } = props;
                                return (
                                    <form onSubmit={handleSubmit}>

                                        <TextField
                                            error={errors.email && touched.email}
                                            label="email"
                                            name="email"
                                            className={classes.textField}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.email && touched.email) && errors.email}
                                            margin="normal"
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><MailOutlineIcon /></InputAdornment>,
                                            }}
                                        />

                                        <TextField
                                            error={errors.password && touched.password}
                                            label="password"
                                            name="password"
                                            className={classes.textField}
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.password && touched.password) && errors.password}
                                            margin="normal"
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><FiberManualRecordIcon /></InputAdornment>,
                                            }}
                                        />
                                        <div className={clsx(classes.rememberMe)}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={isRememberMe}
                                                        onChange={(event) => { setIsRememberMe(!isRememberMe) }}
                                                        name="checkedB"
                                                        color="primary"
                                                    />
                                                }
                                                label="Remember Me"
                                            />
                                        </div>
                                        <Button type="submit" size="large" variant="contained" color="primary" disabled={isSubmitting} className={clsx(classes.loginBtn)}>
                                            Login
                                            </Button>
                                        <Typography variant="subtitle1" className={clsx(classes.signup)}> Don't have an account?    <Link href="#" onClick={preventDefault}>
                                            Sign up
                                         </Link> here</Typography>

                                    </form>
                                );
                            }}
                        </Formik>
                    </CardContent>
                    <CardActions>

                    </CardActions>
                </Card>
            </Grid>
        </Container>
    )
}
export default Login;