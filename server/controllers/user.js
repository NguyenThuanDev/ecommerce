const User = require('../models/user');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { createAccessToken, createRefreshToken } = require("../middlewares/jwt");

const comparePassWord = (password, hasspassword) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.compare(password, hasspassword, function (err, result) {
                resolve(result)
            })
        } catch (error) {
            reject(error)
        }

    })

}
const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, mobile, password } = req.body;
    if (!firstname || !lastname || !email || !mobile || !password) {
        res.status(400).json({
            sucuess: false,
            message: "Missing payload"

        })
    }
    // Cần phải validate cái email,password có hợp lệ không đã rồi hãy chọc vào DB

    const user = await User.findOne({ email: email });
    if (user) {
        throw new Error(`Đã tồn tại user với email là ${email}`)
    }

    const data = await User.create(req.body);
    res.status(200).json({
        success: true,
        message: "Đăng kí thành công, Vui lòng đăng nhập"
    })

})
const getAllUser = asyncHandler(async (req, res) => {
    const allUser = await User.find({}, "-password -_id");
    return res.status(200).json({
        errorCode: 0,
        length: allUser.length,
        data: allUser
    })




});
const getCurrentUser = asyncHandler(async (req, res) => {
    const allUser = await User.findById(req?.user["_id"]).select("-password -_id")
    return res.status(200).json({
        errorCode: 0,
        length: allUser.length,
        data: allUser
    })




});
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            errorCode: 1,
            message: "Missing payload"
        })
    }
    const user = await User.findOne({
        email: email
    })

    if (!user) {
        return res.status(200).json({
            errorCode: 0,
            message: `Không tìm thấy user với email là ${email}`
        })
    }
    else {

        if (await comparePassWord(password, user.password)) {
            //Đăng nhập thành công thì trả về accessToken đi
            const { _id, password, createdAt, updatedAt, role, ...rest } = user.toObject();
            const token = await createAccessToken(_id, role);
            const refeshToken = await createRefreshToken(_id);
            res.cookie("refeshToken", refeshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
            return res.status(200).json({
                errorCode: 0,
                accessToken: token

            })

        } else {
            throw new Error("Sai password")
        }
    }




})
module.exports = { register, getAllUser, getCurrentUser, login }