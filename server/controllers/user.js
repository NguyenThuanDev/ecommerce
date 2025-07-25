const User = require('../models/user');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { createAccessToken, createRefreshToken } = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendmail")
const crypto = require("crypto");
const { request } = require('http');
const { default: mongoose } = require('mongoose');
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
            await User.findByIdAndUpdate(_id, { refreshToken: refeshToken }, { new: true })
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
//Viết hàm RefeshAccessToken, khi token bị hết hạn thì client sẽ gọi hàm này để lấy dũ liệu RefeshToken từ cookie và xin cấp mới token
const RefeshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie?.refeshToken) {
        return res.status(200).json({
            success: false,
            message: "Không có refresh Token ở Cookie, vui lòng đăng nhập lại"
        })
    }

    const decode = await jwt.verify(cookie?.refeshToken, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decode["_id"], refreshToken: cookie?.refeshToken });
    const newToken = await createAccessToken(user["_id"], user['role']);
    return res.status(200).json({
        success: true,
        newAccessToken: newToken
    })




});



// Viết hàm Logout
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie?.refeshToken) {
        return res.status(200).json({
            success: true,
            message: "Người dùng chưa đăng nhập"
        })
    }

    const decode = await jwt.verify(cookie['refeshToken'], process.env.SECRET_KEY);
    console.log(decode)
    await User.findByIdAndUpdate(decode["_id"], {
        refreshToken: ""
    }, { new: true })
    res.clearCookie("refeshToken", { httpOnly: true, secure: true });
    res.status(200).json({
        success: true,
        message: "Logout thành công"
    })


})

//Đầu tiên tạo hàm để resetPassword=> Gọi hàm nếu hợp lệ thì tạo ở DB resetToken và gửi token đó về cho người dùng
const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error(`Không tìm thấy user có email ${email}`)
    }
    const token = user.createTokenChangePass();
    await user.save();
    sendMail(user, token);
    res.status(200).json({
        success: true,
        token: token
    })


});
const verifyChangeToken = asyncHandler(async (req, res) => {
    const { token, newpassword } = req.body;
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) {
        throw new Error("Token không hợp lệ hoặc đã quá thời hạn");
    }
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.refreshToken = undefined;
    user.password = newpassword;
    user.passwordChangeAt = new Date()
    user.save();
    res.status(200).json({
        success: true,
        message: "Đã đổi thông tin thành công"
    })





});
const updateCurrentUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body).length == 0) {
        throw new Error("Missing input!!");
    }
    const userData = await User.findByIdAndUpdate(_id, req.body, { new: true }).select("-password -__v -passwordChangeAt -refreshToken");
    res.status(200).json({
        success: userData ? true : false,
        dataChanged: userData
    })



})

const updateUserbyAdmin = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    if (Object.keys(req.body).length == 0) {
        return res.status(200).json({
            success: false,
            message: "Missing payload"
        })
    }
    const dataChange = await User.findByIdAndUpdate(_id, req.body, { new: true }).select("-password -passwordChangeAt -refreshToken -role");
    return res.status(200).json({
        success: dataChange ? true : false,
        dataChange
    })

})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const userDeleted = await User.findByIdAndDelete(_id).select("-password");
    res.status(200).json({
        success: userDeleted ? true : false,
        userDeleted
    })


});
//cho phép người dùng update địa chỉ của mình
const updateAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { address } = req.body;
    if (!address) {
        throw new Error("Missing payload");
    }
    const response = await User.findByIdAndUpdate(_id, { $push: { address: address } }, { new: true });
    res.status(200).json({
        success: response ? true : false,
        response

    })


});


const addtoCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { product, quantity, variant } = req.body;
    if (!product || !quantity || !variant) {
        throw new Error("Missing payload");
    }
    const alreadyExisting = await User.findOne({ _id, cart: { $elemMatch: { product, variant } } })
    if (alreadyExisting) {
        const response = await User.findOneAndUpdate({
            _id,
            "cart.product": product,
            "cart.variant": variant
        }, {
            $inc: {
                "cart.$.quantity": quantity
            }
        }, { new: true })
        res.status(200).json(
            response

        )
    }
    else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product, quantity, variant } } }, { new: true })
            .populate({
                path: 'cart.product',
                select: 'title price'
            }).select("firstname lastname cart");
        res.status(200).json({
            success: response ? true : false,
            response
        })
    }




})


module.exports =
{
    register,
    getAllUser,
    getCurrentUser,
    login,
    RefeshAccessToken,
    logout,
    forgetPassword,
    verifyChangeToken,
    updateCurrentUser,
    updateUserbyAdmin,
    deleteUser,
    updateAddress,
    addtoCart,

}