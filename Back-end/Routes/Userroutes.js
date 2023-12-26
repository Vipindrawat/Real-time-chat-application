const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../Models/UserSchema');
var jwt = require('jsonwebtoken');
const authentication = require('../Middleware/Authmiddle');

// Route:1 for user signup-api/user/signup: No authentication required:
router.post('/signup',
    [
        body('name', "Name should be atleast 3 characters").isLength({ min: 3 }),
        body('email', "Email should be a valid email and Should be of atleast 13 characters including @gmail.com").isEmail().isLength({ min: 13 }),
        body('password', "Password should be of atleast 5 characters").isLength({ min: 5 })
    ],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ "success": false, errors: errors.array() });
        }
        else {
            const { name, email, password, pic } = req.body;

            const user = await User.findOne({ "email": email });
            if (user) {
                res.json({ "success": false, "error": "User with this email already exists" });
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);

                const newuser = await User.create({
                    name, email, password: hash, pic
                })

                const token = jwt.sign({ "id": newuser._id }, process.env.SECRET
                    // , { expiresIn: '1h' }
                );
                res.json({ "success": true, token });
            }
        }
    }))

// Route:2 for user login -/api/user/login :No authentication required:
router.post('/login', [
    body('email', "Email should be a valid email and Should be of atleast 13 characters including @gmail.com").isEmail().isLength({ min: 13 }),
    body('password', "Password should be of atleast 5 characters").isLength({ min: 5 })
],
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ "success": false, errors: errors.array() });
        }
        else {
            const { email, password } = req.body;
            const finduser = await User.findOne({ email });
            if (!finduser) {
                return res.json({ "success": false, "error": "Please enter valid credential" });
            }
            else {
                const match = await bcrypt.compare(password, finduser.password);
                if (match) {
                    const token = jwt.sign({ "id": finduser._id }, process.env.SECRET
                        // , { expiresIn: '1h' }
                    );
                    res.json({ "success": true, token });
                }
                else {
                    return res.json({ "success": false, "error": "Please enter valid credential" });
                }
            }
        }
    }

    ))

// Route:3 for fetching user information:/api/user/info: Authentication required:
router.get('/info', authentication, asyncHandler(async (req, res) => {
    const userdata = await User.findById(req.user.id).select("-password");
    res.json({ "success": true, userdata });
}))

// Route:4 For searching user in database using name or email : /api/user/search -Authentication required:
router.get('/search', authentication, asyncHandler(async (req, res) => {
    const search = req.query.credential;
    if (search) {
        const data = {
            //$or operator in mongodb returns either true or false -it returns true if either one of the condition or both of the conditions are satisfied-when both conditions are not satisfied it returns false:
            $or: [
                //$regex :is used to find for a pattern in database
                //$options :i --is means case insensitive:
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }
        const result = await User.find(data).find({ "_id": { $ne: req.user.id } }).select("-password");
        if (result.length == 0) {
            return res.json({ "success": true, "result": "No user found with entered credentials" });
        }
        else {
            res.json({ "success": true, result });
        }
    }
}))

module.exports = router;