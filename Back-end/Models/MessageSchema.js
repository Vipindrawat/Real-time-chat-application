const mongoose = require('mongoose');

const messageschema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Message', messageschema);