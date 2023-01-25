import React, {useEffect} from "react";
import {Pagination , PaginationItem} from '@material-ui/lab';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import useStyles from './styles';

const Paginate= ({page})=>{
    const dispatch = useDispatch();
    const classes= useStyles();
    // const {posts}= useSelector((state)=> state.posts);
    const {numberOfPages}= useSelector((state)=> state.posts);
    console.log(numberOfPages);
    useEffect(()=>{
        if(page) dispatch(getPosts(page));
    },[page])

    return (
        <>
        <Pagination
         className={classes.ul}
         count={numberOfPages}
         page= {Number(page) || 1}
         variant="outlined"
         color="primary"
         renderItem={(item)=>( 
            <PaginationItem {...item}  component={Link}  to={`/posts?page=${item.page}`} />
         )}
        />
        </>
    )
}
export default Paginate;