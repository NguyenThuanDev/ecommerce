const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            },
            variant: {
                type: String
            }
        }
    ],
    status: {
        type: String,
        enum: ["Pending", "Processing", "Succeed"]
    },
    total: {
        type: Number
    },
    coupon: {
        type: mongoose.Types.ObjectId,
        ref: "Coupon"
    },
    totalDiscount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);