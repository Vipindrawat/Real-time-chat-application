const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ "success": false, "error": "Please authenticate using valid token" });
    }
    else {
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).json({ "success": false, "error": "Please authenticate using valid token" });
            }
            else {
                req.user = decoded;

                next();
            }
        });
    }

}
module.exports = authentication;