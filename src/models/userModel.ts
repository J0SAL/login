import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPassword: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,
    },
    verifyToken : {
        type: String,
    },
    verifyExpiry: {
        type: Date,
    },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
