const mongoose = require('mongoose'); // Erase if already required
const crypto = require("crypto")
// Declare the Schema of the Mongo model
const bcrypt = require('bcrypt');
const hashPassword = (password) => {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            resolve(hash);
        })
    })

}
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        index: true,
    },
    lastname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Biểu thức regex kiểm tra email
            'Please fill a valid email address', // Thông báo lỗi nếu không khớp regex
        ]
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }]
    },
    wishlist: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
    },
    refreshToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    passwordChangeAt: {
        type: String
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
    this.password = await hashPassword(this.password);

})

// Ta có thể định nghĩa thêm hàm ở đây ==> khi mà ta dùng toán tử find, findOne thì trả về instace, instance đó có các phương thức ở đây
userSchema.methods = {
    createTokenChangePass: function () {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
        return resetToken;
    }
}
module.exports = mongoose.model('User', userSchema);