const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../Models/UserSchema');
const authentication = require('../Middleware/Authmiddle');
const Chat = require('../Models/ChatSchema');
const Message = require('../Models/MessageSchema');

//Route-1: For sending the message :/api/message/send:- Authentication required:
router.post('/send', authentication, [
    body('message', "message should not be empty").notEmpty(),
    body('chatId', "chatId should not be empty").notEmpty()
],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ "success": false, errors: errors.array() });
        }
        else {
            const { message, chatId } = req.body;
            const findchatid = await Chat.findById(chatId);

            if (!findchatid) {
                return res.status(404).json({ "success": false, "error": "not found" });
            }

            const data = {
                sender: req.user.id,
                message,
                chat: chatId
            }

            const sndmssg = await Message.create(data);
            const mssgid = sndmssg._id.toString();
            let getmessage = await Message.findById(mssgid).populate("sender", "-password").populate("chat");
            getmessage = await User.populate(getmessage, {
                select: "chat.users",
                path: "name email pic"
            })

            await Chat.findByIdAndUpdate(chatId, {
                latestMessage: mssgid
            })

            res.json({ "success": true, "message": getmessage });
        }
    }))

// Route:2 - For getting all the messages in the chat:Authentication required:/api/message/getmessage:
router.get('/getmessage/:chatId', authentication,
    [
        check('chatId', "chatId should not be empty").notEmpty()
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ "success": false, errors: errors.array() });
        }

        else {
            const chatId = req.params.chatId
            const findchat = await Chat.findById(chatId);

            if (!findchat) {
                return res.status(404).json({ "success": false, "error": "not found" });
            }

            let getmessage = await Message.find({ "chat": chatId }).populate("sender", "-password").populate("chat");
            getmessage = await User.populate(getmessage, {
                select: "chat.users",
                path: "name email pic"
            })
            res.json({ "success": true, "message": getmessage });
        }
    }))

module.exports = router;
