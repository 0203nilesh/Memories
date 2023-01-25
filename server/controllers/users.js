import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

export const signup=async (req, res)=>{
    const {email, password, firstName, lastName, confirmPassword}= req.body;
    try {
        const existingUser= await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exist"});
        if(password!==confirmPassword) return res.status(400).json({message: "Password don't match."});
        const hashedPassword= await bcrypt.hash(password, 12);
        const newUser= new User({email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const result=await newUser.save();
        const token= jwt.sign({email: result.email, id: result._id},'test', {expiresIn: "1h"});
        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong. "})
        console.log(error);
    }
}
export const signin=async (req, res)=>{
    const {email, password} = req.body;
    try {
        const existingUser= await User.findOne({email}) 
        if(!existingUser) return res.status(404).json({message: "User doesn't exist"});
        const isPasswordCorrect= await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials."});
        const token= jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'});
        res.status(200).json({result: existingUser, token: token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong. "})
        console.log(error);
    }
}