const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testapp");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic:{
        type: String,
        default: "default.jpg"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});

module.exports = mongoose.model('user',userSchema);