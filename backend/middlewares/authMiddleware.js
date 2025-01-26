const jwt = require("jsonwebtoken");
const User = require("../models/registerModel");
const expressAsyncHandler = require("express-async-handler");

const authMiddleware = expressAsyncHandler(async (request, response, next) => {
    let token;
    if (request.cookies && request.cookies.token) {
        try {
            token = request.cookies.token; 
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            request.user = await User.findById(decoded.id).select('-password');

            if (!request.user) {
                return response.status(404).json({ message: "User not found!" });
            }

            next();
        } catch (err) {
            console.error(err);
            return response.status(401).json({ message: "Not authorized, invalid token!" });
        }
    } else {
        return response.status(401).json({ message: "No token found in cookies. Unauthorized!" });
    }
});

module.exports = authMiddleware;
