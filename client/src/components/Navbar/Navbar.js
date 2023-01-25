import React from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from './styles';
import decode from 'jwt-decode';
// import memories from '../../images/memories.png';
import memoriesLogo from  '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';

import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory ,useLocation} from 'react-router-dom';

export const Navbar = () => {
    const history= useHistory();
    const dispath = useDispatch();
    const location = useLocation();
    const [user, setUser]= useState(JSON.parse(localStorage.getItem('profile')))
    const classes= useStyles();

    useEffect(() => {
        const token= user?.token;
        if(token){
            const decodeToken= decode(token);
            if(decodeToken.exp *1000 < new Date().getTime()) logOut();
         }
        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location])
    const logOut= ()=>{
        dispath({type: 'LOGOUT'});
        history.push("/");
        setUser(null);
    }

  return (
    <>
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
        <img src={memoriesText} alt='icon' height='45px' />
        <img className={classes.image} src={memoriesLogo} alt="memories" height="60"/>
        </Link>
        <Toolbar className={classes.toolbar} >
            {user?(
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName}  variant="h6"> {user.result.name}</Typography>
                    <Button variant='contained'  className={classes.logout} color="secondary" onClick={logOut}>Logout</Button>
                </div>
            ): (
                <Button component={Link} to="/auth" variant='contained' color="primary" >Sign In</Button>
            )}
        </Toolbar> 
    </AppBar>
    </>
  )
}

