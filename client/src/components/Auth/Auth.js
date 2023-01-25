import React from 'react'
import { useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Input } from './Input';
import {GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import Icon from './Icons';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { signin, signup } from '../../actions/auth';

const initialState= {firstName: '', lastName:'', email:'', password: '', confirmPassword:''};
export const Auth = () => {
    const [formData, setFormData]= useState(initialState);
    const history= useHistory();
    const dispath = useDispatch();
    const [showPassword, setShowPassword]= useState(false);
    const [isSignup, setIsSignUp]= useState(false);
    const classes= useStyles();

    const handleSubmit= (e)=>{
        e.preventDefault();
        // console.log(formData);
        if(isSignup){
            dispath(signup(formData, history));
        }else{
            dispath(signin(formData, history));
        }
    }
    const handleChange= (event)=>{
        const setProp= event.target.name;
        const setVal= event.target.value;
        setFormData((prevValue)=>{
            return {...prevValue , [setProp]: setVal};
        })
    }
    const handleShowPassword= ()=>{
        setShowPassword((prevValue)=> !prevValue);
    }
    const switchMode= ()=>{
        setIsSignUp((prevValue)=> !prevValue);
    }

    const clientId = '46357532502-rcm3q0pjajg9f9iqc162evnr0q0jk6ev.apps.googleusercontent.com';
        useEffect(() => {
        const initClient = () => {
                gapi.client.init({
                clientId: clientId,
                scope: ''
            });
            };
            gapi.load('client:auth2', initClient);
        });

    const googleSuccess= async (res)=>{
        const result= res?.profileObj;
        const token= res?.tokenId;
        console.log("Successfully authenticated");
        try {
            dispath({type: 'AUTH' , data: {result,token}})
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure= (error)=>{
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later");
    }
  return (
    <>
        <Container componenet="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon/> 
                </Avatar>
                <Typography variant='h5' >{isSignup? "Sign Up" : "Sign In"} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        {isSignup && (<>
                            <Input name="firstName" label="First Name" handleChange={handleChange} half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>)}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"  />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text" : "password"}  handleShowPassword={handleShowPassword} />
                        {isSignup && (<Input name="confirmPassword" label= "Confirm Password" handleChange={handleChange} type={showPassword? "text" : "password"}  handleShowPassword={handleShowPassword}/>)}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}> {isSignup? "Sign Up": "Sign In"}</Button>
                    <GoogleLogin
                        clientId='46357532502-rcm3q0pjajg9f9iqc162evnr0q0jk6ev.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>Google Sign In </Button>                             
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justifyContent='center'>
                        <Grid item >
                            <Button onClick={switchMode} > 
                            {isSignup? "Already have an account? Sign In": "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    </>
  )
}
