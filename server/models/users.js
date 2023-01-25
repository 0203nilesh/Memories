import mongoose from "mongoose";

const userShema= mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String}
})

export default mongoose.model("User", userShema);