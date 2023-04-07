
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name: {
        type: String,
        maxlength: 255,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    description: {
        type: String,
    },
    images: {
        type: [String] 
    },
    categories: {
        type: [String]
    },
    brands: {
        type: [String]
    },

    created_by: {
        type: ObjectId,
        required: true

    }

});


module.exports = mongoose.model("Product", ProductSchema)

