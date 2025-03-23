const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
    //Trích xuất cái request để lấy token
    const token = req?.headers?.authentication;
    console.log(token)
    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
        if (error) {
            return res.status(401).json({
                success: false,
                message: "Unvalid token"
            })
        }
        else {
            req.user = { _id: decode["_id"] }
            next()
        }

    })




}
const isAdmin = expressAsyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (user.role !== "admin") throw new Error("Admin role is requried for this function!!");
    next();
});

module.exports = { verifyToken, isAdmin };