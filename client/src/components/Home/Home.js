import React, {useEffect, useState} from "react";
import {Container , Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from "react-redux";
import { getPosts , getPostsBySearch} from "../../actions/posts";
import useStyle from './styles';
import Pagination from '../Pagination/Pagination';

function useQuery (){
    return new URLSearchParams(useLocation().search);
}

export const Home = () => {
    const classes= useStyle();
    const [currentId, setCurrentId]= useState(0);
    const dispatch= useDispatch();
    const query= useQuery();
    const history= useHistory();
    const page= query.get("page") || 1;
    const searchQuery= query.get('searchQuery');
    const [search, setSearch]= useState("");
    const [tags, setTags]= useState([]);

    // useEffect(()=>{
    //     dispatch(getPosts());
    // }, [currentId, dispatch])

    const handleKeyPress= (event)=>{
        if(event.keyCode===13){
            //Search Post
            searchPost();
        }
    }
    const handleAddChip= (tag) =>{  setTags([...tags, tag])}
    const handleDeleteChip= (tagToDelete)=> {setTags(tags.filter((tag)=> tag!==tagToDelete))}
    const searchPost= ()=>{
        if(search.trim() || tags){
            dispatch(getPostsBySearch({search, tags: tags.join(",")}));
            history.push(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(",")}`);
        } else{
            history.push("/");
        }
    }
  return (
    <>
    <Grow in> 
        <Container maxWidth="xl">
            <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3} >
                <Grid item xs={12} sm={6} md={9}>
                    <Posts currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}  />
                    {(!searchQuery && !tags.length) && (
                    <Paper elevation={6} className={classes.pagination}>
                    <Pagination page={page} />
                    </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
    </>
  )
}
