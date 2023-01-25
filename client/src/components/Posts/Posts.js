import React from "react";
import Post from "./Post/post";
import useStyles from './styles';
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";


function Posts ({currentId, setCurrentId}){
    const {posts, isLoading}= useSelector((state)=> state.posts); // [before] but now {now}
    const classes= useStyles();
    if(!posts.length && !isLoading) return 'No Posts';
    
    return(
        <>
        {isLoading ? <CircularProgress/> :(
            <Grid container className= {classes.container}  alignItems="stretch" spacing={3}>
                {posts.map((post)=>{
                    return(
                    <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />    
                     </Grid>
                    )
                })
                }
            </Grid>
        )}
        </>
    )
}

export default Posts;