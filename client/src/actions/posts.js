import * as api from '../api/index';
import { FETCH_ALL, UPDATE, DELETE, LIKE, CREATE, FETCH_BY_SEARCH ,START_LOADING, END_LOADING ,FETCH_POST } from '../constants/actionType';

//Action creators  
export const getPosts= (page)=> async (dispatch)=> {
    try {
        dispatch({type: START_LOADING});
        const {data }=await api.fetchPosts(page);
        const action= {type: FETCH_ALL, payload: data};
        dispatch(action);
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getPost= (id) => async (dispatch)=>{
    try {  
        dispatch({type: START_LOADING});
        const {data}= await api.fetchPost(id);
        const action= {type: FETCH_POST, payload: data};
        dispatch(action);
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}
export const getPostsBySearch= (searchQuery)=> async (dispatch)=>{
    try {
        dispatch({type: START_LOADING});
        console.log(searchQuery);
        const {data: {data} }= await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}





















export const createPost= (post, history)=>async (dispatch)=>{
    try {
        const {data}= await api.createPost(post);
        const action= {type: CREATE, payload: data}
        dispatch(action);
        history.push(`/posts/${data._id}`);
    } catch (error) {
        console.log(error);
    }
}

export const updatePost= (id ,post)=>async (dispatch)=>{
    try {
        const {data}= await api.updatePost(id, post);
        const action= {type: UPDATE, payload: data}
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}
export const deletePost= (id)=>async (dispatch)=>{
    try {
         await api.deletePost(id);
        const action= {type: DELETE, payload: id}
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}
export const likePost= (id)=>async (dispatch)=>{
    const user= JSON.parse(localStorage.getItem("profile"));
    try {
        const {data}= await api.likePost(id, user?.token);
        console.log(data);
        const action={type: LIKE, payload:data}
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}