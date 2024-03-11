import jwt from "jsonwebtoken";

function createToken(employee) {
    const token = jwt.sign({
        id: employee._id,
        isAdmin: employee.isAdmin,
        isOprator: employee.isOprator,
    }, process.env.JWT_SECRET);

    return token;
}

export { createToken };