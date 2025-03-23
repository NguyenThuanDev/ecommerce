const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["Discount X percentage", "Discount X $", "Free shipping"],
        
    },
    isAppliedAll: {
        type: Boolean,
    },
    minOrderValue: {
        type: Number,
        required: true,
        default: 0
    },
    //gán product được áp dụng mã giảm giá tay
    productApplied: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        }
    ],
   
    expired: {
        type: Date

    },
    limitedUsed: {
        type: Number,
        default: 20000
    },
    currentUsed: {
        type: Number,
        default: 0
    },
    valueDiscount: {
        type: Number,
    }
});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);