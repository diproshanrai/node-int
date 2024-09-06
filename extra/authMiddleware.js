const jwt = require('jsonwebtoken');
const { JWT_SECRET }= process.env;

function authToken(req, res, next){
    const token = req.header("Authorization")?.split("")[1];
    if (!token) {
        return res.status(401).json({ error: "Acces denied no token provided"})
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error){
        console.error("Error occured", error);
        res.status(400).json({ error: 'Invalid Token'})
    }
};

module.exports = authToken;