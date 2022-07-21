const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    categoryId:{
        type: Number,
        unique: true,
        trim: true
    },
    categoryname:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description:{
        type: String,
    },
    Date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Category = mongoose.model('category', CategorySchema)