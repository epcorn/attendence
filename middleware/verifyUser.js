import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, "unauthorized"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, "unauthorized"));
        }
        req.user = user;
        next();
    });
};

const ifAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "Forbidden"));
    }
    next();
};
const ifOprator = (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "Forbidden"));
    }
    next();
};

const ifOpratorOrAdmin = (req, res, next) => {
    if (!req.user.isAdmin && !req.user.isOprator) {
        return next(errorHandler(403, "Forbidden"));
    }
    next();
};

export { verifyToken, ifAdmin, ifOprator, ifOpratorOrAdmin }

