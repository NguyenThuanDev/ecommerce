const mongoose = require('mongoose'); // Erase if already required
const fs = require('fs');
// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [4, "Product must have 4 characters in length"]
    },
    slug: {
        type: String,
        // required: true,
        // unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    quanity: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: [String]
    },
    color: {
        type: String,
        enum: {
            values: ["Black", "Blue", "White"],
            message: "The color is not valid"
        }
    },
    ratings: [{
        star: { type: Number },
        postedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: String
        }
    }],
    totalRatings: {
        type: Number,
        default: 0
    },
    createBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }


}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }



});

productSchema.virtual("priceInUSD").get(function () {
    return this.price / 25000

})
//"save" chỉ áp dụng cho các phương thức như create, hoặc save(); 
productSchema.post("save", async function (doc, next) {
    try {
        await doc.populate("createBy", "email")
        const content = `Product with ${doc.title} is created By user with email ${doc.createBy.email}`
        fs.writeFileSync('./Logs/product_log.txt', content, { flag: 'a+' }, err => {
            console.log(err)
        })
    } catch (error) {
        console.log(error.message)

    }



})
productSchema.pre(/^find/, function () {
    console.log("đã find")
})

//Export the model
module.exports = mongoose.model('Product', productSchema);