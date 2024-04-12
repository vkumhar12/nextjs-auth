import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide the username"],
        unique: [true, "This username already exists"],
    },
    email: {
        type: String,
        required: true,
        unique: [true, "This email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter the Password "]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        defualt: false,
    },
    forgetPasswordToken: {
        type: String,
    },
    forgetPasswordTokenExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },

}, { timestamps: true })


// it checks whether the model is present or not in DB if not then it create one

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;
