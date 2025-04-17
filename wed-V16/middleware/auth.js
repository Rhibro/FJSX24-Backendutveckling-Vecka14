function authenticate(req, res,next) {
    const authHeader = req.headers.authorization;

    if (authHeader === "Bearer secret-token") {
        next();
    } else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = authenticate;