import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
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

const User = mongoose.models.users || mongoose.model("User", userSchema);

export default User;