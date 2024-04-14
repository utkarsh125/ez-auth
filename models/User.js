import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,

    },

    password:{
        type: String,
        required: true,
    }
}, {timestamps: true}//this will store when the data was added
);

const User = models.User || mongoose.model("User", UserSchema);



export default User;