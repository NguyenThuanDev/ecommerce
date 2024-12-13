const mongoose = require('mongoose'); // Erase if already required

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
}, { timestamps: true });

userSchema.pre('save', async function () {
    this.password = await hashPassword(this.password);

})
module.exports = mongoose.model('User', userSchema);