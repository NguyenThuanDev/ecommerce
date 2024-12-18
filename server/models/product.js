const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    brand: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        require: true,

    },
    warranty_years: {
        type: Number,
        require: true,

    },
    available: {
        type: Boolean,
        require: true
    }
});

//Export the model
module.exports = mongoose.model('Product', productSchemaSchema);