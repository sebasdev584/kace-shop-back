const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        minLength: 3
    },
    product_reference: {
        type: String,
        required: true,
        minLength: 3
    },
    product_price: {
        type: Number,
        required: true,
        min: 1
    },
    product_weight: {
        type: Number,
        required: true,
        min: 1
    },
    product_category: {
        type: String,
        required: true,
        minLength: 3
    },
    product_stock: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)