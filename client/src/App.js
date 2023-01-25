import React from 'react'
import {Container } from '@material-ui/core';
import './index.css';
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { BrowserRouter,Route, Switch} from "react-router-dom";
import { Auth } from './components/Auth/Auth';
import { Redirect } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';

function App(){
    const user= JSON.parse(localStorage.getItem("profile"));
    console.log(user);
    return(
        <BrowserRouter>
        <Container maxWidth="xl">
            <Navbar/>
                <Switch>
                    <Route path="/" exact> <Redirect to={'/posts'}/> </Route>
                    <Route path="/posts" exact> <Home/> </Route>
                    <Route path="/posts/search" exact> <Home/> </Route>
                    <Route path="/posts/:id" exact> <PostDetails/> </Route>
                    <Route path="/auth" exact> {!user? <Auth/> : <Redirect to={'/posts'}/>  } </Route>
                </Switch>
        </Container>
        </BrowserRouter>
    )
}

export default App;