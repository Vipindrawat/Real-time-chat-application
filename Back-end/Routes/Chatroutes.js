const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const authentication = require('../Middleware/Authmiddle');
const User = require('../Models/UserSchema');
const Chat = require('../Models/ChatSchema');


//Route :  1 -For acessing the one-one chat or for creating the one-one chat-
// Authentication required --route-/api/chat/create:
router.post('/create', authentication, [body("userId", "UserId should not be empty").notEmpty()], asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ "success": false, errors: errors.array() });
    }
    else {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ "success": false, "error": "user with given id not found" });
        }
        //It is not required to convert the data into js object as express convert all  the data in request body into j.s object: 
        const data = {
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user.id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }
        //Finding the chat between logined user and given user id:
        let ischat = await Chat.find(data).populate("users", "-password").populate("latestMessage");
        ischat = await User.populate(ischat, {
            path: "latestMessage.sender",
            select: "name email pic"
        })

        if (ischat.length > 0) {
            res.json({ "success": true, "chat": ischat[0] });
        }
        else {
            console.log("inside else");
            //If chat between logined user and given user id is not found then creating chat between them:
            const obj = {
                isGroupChat: false,
                chatName: "sender",
                users: [
                    userId, req.user.id
                ]
            }
            // When we are creating an document using create() at this point populate() method is not applicable as -:The populate method is used to fetch data from related documents, and it doesn't have any related documents to fetch when you're creating a new document.
            const chat = await Chat.create(obj);
            let chatid = chat._id.toString();
            let haschat = await Chat.findById(chatid)
                .populate("users", "-password").populate("latestMessage");
            haschat = await User.populate(haschat, {
                path: "latestMessage.sender",
                select: "pic name email"
            })
            res.json({ "success": true, "chat": haschat })
        }
    }
}))

//Route :  2 -For getting all the chat of a particular user-
// Authentication required:-  /api/chat/getchat:
router.get('/getchat', authentication, asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ "success": false, errors: errors.array() });
    }
    else {
        //To search for all the chats in chat model where the logined user is present:
        const chat = {
            users: { $elemMatch: { $eq: req.user.id } }
        }
        // sort method should be used before adding extra details like user information.-otherwise it will not work:
        let allchats = await Chat.find(chat).populate("users", "-password").populate("groupAdmin", "-password").populate('latestMessage').sort({ updatedAt: -1 });
        allchats = await User.populate(allchats, {
            path: "latestMessage.sender",
            select: "name email pic"
        })

        res.json({ "success": true, "chats": allchats });
    }
}))

//Route :  3 -For creating the group-Authentication required:/api/chat/group:
router.post('/group', authentication,
    [
        body('chatName', "There should be a group name").notEmpty(),
        body('users').isArray().custom(value => value.length >= 2) // Custom validator to check array length
            .withMessage('There should be atleast 3  users required to form a group chat')
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        // If validation is not satisfied:
        if (!errors.isEmpty()) {
            return res.status(400).json({ "success": false, errors: errors.array() });
        }
        else {
            const { chatName, users } = req.body;
            for (let i = 0; i < users.length; i++) {
                let user = await User.findById(users[i]);
                if (!user) {
                    return res.status(404).json({ "success": false, "error": "user with the given id not found" });
                }
            }
            //  Adding the user loged in as part of users in group:
            users.push(req.user.id);
            // group object:
            const data = {
                chatName,
                isGroupChat: true,
                users,
                groupAdmin: req.user.id
            }
            // creating group in mongodb:
            const groupchat = await Chat.create(data);
            const groupid = groupchat._id.toString();
            //Getting new made group form mongodb and populating some fields inside it:
            // Populate method does not work with create() method:
            let group = await Chat.findById(groupid).populate("users", "-password").populate("latestMessage");
            group = await User.populate(group, {
                path: "latestMessage.sender",
                select: "name email pic"
            })
            res.json({ "success": true, group });
        }
    }))

//Route :  4 -For renaming the group-Authentication required:/api/chat/rename:
// router.put('/rename/:id', authentication,
//     [body('name', "new group name cannot be empty").notEmpty()]
//     , asyncHandler(async (req, res) => {
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).json({ "success": false, errors: errors.array() });
//         }
//         else {
//             const group = await Chat.findById(req.params.id);
//             if (!group) {
//                 return res.status(400).json({ "success": false, "error": "Not found" });
//             }
//             else {
//                 if (group.isGroupChat == false) {
//                     return res.status(400).json({ "success": false, "error": "Not found" });
//                 }
//                 else if (group.groupAdmin.toString() !== req.user.id) {
//                     return res.status(500).json({ "success": false, "error": "Only group leader can change group name" });
//                 }
//                 else {
//                     const { name } = req.body;
//                     group.chatName = name;
//                     const newgroup = await group.save();
//                     res.json({ "success": true, newgroup })
//                 }
//             }
//         }
//     }))

// //Route :  5 -To remove someone form the group-Authencation required-/api/chat/remove:
// router.put('/remove', authentication, [body('groupid', "groupid should not be empty").notEmpty(),
// [body('user', "user should not be empty").notEmpty()]], asyncHandler(async (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ "success": false, errors: errors.array() });
//     }
//     else {
//         const { groupid, user } = req.body;
//         const findgroup = await Chat.findById(groupid);
//         const finduser = await User.findById(user);
//         let match = findgroup.users.filter((value) => {
//             return value == user;
//         })
//         //checking for valid group:
//         if (!findgroup) {
//             return res.status(404).json({ "success": false, "error ": "not found" });
//         }
//         // checking for valid user
//         else if (!finduser) {
//             return res.status(404).json({ "success": false, "error": "not found" });
//         }
//         // wheather user is part or group or not:
//         else if (match.length == 0) {
//             return res.status(404).json({ "success": false, "error": "not found" });
//         }
//         else if (findgroup.groupAdmin != req.user.id) {
//             return res.status(401).json({ "success": false, "error": "only group leader can remove a user from a group" });
//         }
//         else {
//             findgroup.users.pull(user);
//             const newgroup = await findgroup.save();
//             res.json({ "success": true, newgroup });
//         }
//     }
// }))

// //Route :  6 -To add someone to the group-Authentication required-/api/chat/add:
// router.put('/add', authentication, [body('groupid', "groupid should not be empty").notEmpty(),
// [body('user', "user should not be empty").notEmpty()]], asyncHandler(async (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return res.status(400).json({ "success": false, errors: errors.array() });
//     }
//     else {
//         const { groupid, user } = req.body;
//         const findgroup = await Chat.findById(groupid);
//         const finduser = await User.findById(user);
//         let match = findgroup.users.filter((value) => {
//             return value == user;
//         })
//         //checking for valid group:
//         if (!findgroup) {
//             return res.status(404).json({ "success": false, "error ": "not found" });
//         }
//         // checking for valid user
//         else if (!finduser) {
//             return res.status(404).json({ "success": false, "error": "not found" });
//         }
//         // wheather user is part or group or not:
//         else if (match.length != 0) {
//             return res.status(401).json({ "success": false, "error": "user is already the part of the group" });
//         }
//         else if (findgroup.groupAdmin != req.user.id) {
//             return res.status(401).json({ "success": false, "error": "only group leader can remove a user from a group" });
//         }
//         else {
//             findgroup.users.push(user);
//             const newgroup = await findgroup.save();
//             res.json({ "success": true, newgroup });
//         }
//     }
// }))

// Route for editing the group:
router.put('/edit/:id', authentication, asyncHandler(async (req, res) => {
    //group with this id exists or not :
    const group = await Chat.findById(req.params.id);
    if (!group) {
        return res.status(400).json({ "success": false, "error": "Not found" });
    }

    //if the person editing is the group admin or not:
    else if (group.groupAdmin != req.user.id) {
        return res.status(400).json({ "success": false, "error": "Only admin can edit the group" });
    }
    else {
        const { users, chatName } = req.body;
        users.push(req.user.id);
        const editgroup = {};
        if (users) { editgroup.users = users };
        if (chatName) { editgroup.chatName = chatName };

        const updatedgroup = await Chat.findByIdAndUpdate(req.params.id, { $set: editgroup }, { new: true });
        res.json({ "success": true, updatedgroup })
    }
}))


module.exports = router;