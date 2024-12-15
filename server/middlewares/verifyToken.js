const jwt = require("jsonwebtoken");


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
        req.user = { _id: decode["_id"] }
    })


    next()

}

module.exports = { verifyToken };