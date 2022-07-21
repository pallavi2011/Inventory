const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    productname:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price:{
        type:Number,
        required: true
    },
    Date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Product = mongoose.model('product', ProductSchema)