const { my_secret_key } = require("../config/env.config");
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Access denied' });
        };
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, my_secret_key);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is Expired or Unauthorized' });
    };
};

module.exports = verifyToken;