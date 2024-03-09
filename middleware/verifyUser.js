import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, "unauthorized")); // HTTP status code for Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, "unauthorized"));
        }
        req.user = user;
        next();
    });
};

const verifyAdmin = (req, res, next) => { };
const verifyOprator = (req, res, next) => { };

export { verifyToken, verifyAdmin, verifyOprator }

