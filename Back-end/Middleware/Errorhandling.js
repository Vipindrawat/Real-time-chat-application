const errorhandle = (error, req, res, next) => {
    return res.status(500).json({ "err": "internal server error", error });
}

module.exports = errorhandle;