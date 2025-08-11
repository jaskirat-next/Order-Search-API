import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    order_unique_id: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    }
},{timestamps: true})

export const Order = mongoose.model('Order', orderSchema)