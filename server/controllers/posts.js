import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts= async (req, res)=>{
    const {page }= req.query;
    try {
        const LIMIT= 8;
        const startIndex= (Number(page)-1) *LIMIT; //Starting point of every page.
        const total=await PostMessage.countDocuments({});
        // console.log(total);
        //We want to render the newest first and skip the first page posts if we are on the second page.
        const posts= await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({data : posts , currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const getPost= async (req, res)=>{
    const {id }= req.params;
    try {
        const post=await PostMessage.findById(id);
        res.status(200).json({data: post});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const getPostsBySearch = async (req, res)=>{
    const {searchQuery, tags}= req.query;
    try {
        const title= RegExp(searchQuery, 'i');
        const posts =await PostMessage.find({$or: [{title} , {tags: {$in: tags.split(',')}}]});
        res.status(200).json({data: posts});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost=async (req, res)=>{
    const post = req.body;
    const newPost= new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res)=>{
    const {id}= req.params;
    const updatePost= req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    try {
        const posts= await PostMessage.findByIdAndUpdate(id, updatePost, {new: true});
        res.status(200).json(posts);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}
export const deletePost = async (req, res)=>{
    const {id}= req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    try {
        await PostMessage.findByIdAndRemove(id);
        res.status(200).json({message: "Post Deleted Succesfully"});
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const likePost =async (req, res)=>{
    const {id}= req.params;
    if(!req.userId) return res.json({message: "Unauthenticated"});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    try {
        const post= await PostMessage.findById(id);
        const index= post.likes.findIndex((id)=> id===String(req.userId));
        if(index===-1){
            post.likes.push(req.userId);
        } else{
            post.likes.filter((id)=> id!== String(req.userId));
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}