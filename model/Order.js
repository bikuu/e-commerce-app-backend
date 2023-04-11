
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/* embeded documents vs reference documenets */
const OrderSchema = new Schema({
    products: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                min: 0,
                required: true,

            },
            price: {
                type: Number,
                min: 0,
                required: true,
            },
            status: {
                type: String,
                enum: ["pending", "shipped", "rejected"],
                default: "pending"
            },
            product_id: {
                type: ObjectId,
                ref: "Product",
                required: true
            }
        },


    ],
    created_by: {
        type: ObjectId,
        ref: "User",
        required: true
    }
});


module.exports = mongoose.model("Order", OrderSchema)
