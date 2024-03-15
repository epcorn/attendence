import jwt from "jsonwebtoken";

function createToken(employee) {
    let date = new Date().toISOString().split("T")[0];
    console.log(date);
    const token = jwt.sign({
        id: employee._id,
        isAdmin: employee.isAdmin,
        isOprator: employee.isOprator,
    }, process.env.JWT_SECRET);

    return token;
}

export { createToken };