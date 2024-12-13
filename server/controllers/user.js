const User = require('../models/user');
const asyncHandler = require('express-async-handler')



const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, mobile, password } = req.body;
    if (!firstname || !lastname || !email || !mobile || !password) {
        res.status(400).json({
            sucuess: false,
            message: "Missing payload"

        })
    }


    const data = await Users.create(req.body);
    res.status(200).json({
        success: true,
        data: data
    })

})

module.exports = { register }