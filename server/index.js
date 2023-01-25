import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import postRoute from './routes/posts.js';
import userRoute from './routes/users.js';
import dotenv from 'dotenv';

const app= express();
dotenv.config();
const port= process.env.PORT ;
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/posts", postRoute);
app.use("/user", userRoute);

app.get("/",(req,res)=>{
    res.send("Hello World");
})


//Database Connection:-
// mongoose.set("strictQuery", true);
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(port, ()=> console.log(`Server is listening at port: ${port}`)))
    .catch((error)=> console.log(error))

