const mongoose = require('mongoose');

const chatschema = mongoose.Schema({
    chatName: {
        type: String,
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Chat", chatschema);