const jwt = require("jsonwebtoken");
const createAccessToken = (_id, role) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.sign({ _id, role }, process.env.SECRET_KEY, { expiresIn: "3d" }, function (err, token) {
                resolve(token)
            });
        } catch (error) {
            reject(error)
        }

    })


}

const createRefreshToken = (_id) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "7d" }, function (err, token) {
                resolve(token)
            });
        } catch (error) {
            reject(error)
        }
    })

}
module.exports = { createAccessToken, createRefreshToken };