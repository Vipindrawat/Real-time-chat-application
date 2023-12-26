const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://img.freepik.com/free-icon/user_318-180888.jpg"
    }
},
    {
        //It is used to automaticially add two fields -CreatedAt and UpdatedAt:
        timestamps: true
    })

module.exports = mongoose.model("User", userschema);