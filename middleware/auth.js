const jwt = require('jsonwebtoken')
const { TOKEN_KEY } = process.env
const verifyToken = (req, res, next) => {
    const token = req.headers["Authorization"]
    if(!token) {
        return res.status(403).send("A token is required for authentication")
    }
    try {
        jwt.verify(token, TOKEN_KEY);
    } catch (e) {
        return res.status(401).send("invalid token")
    }
    return next();
}
module.exports = verifyToken;