

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, require: true },
    phone: { type: Number, required: true },
    products: [{
        productId: { type: String },
        quantity: {
            type: Number,
            default: 1
        }
    }], amount: { type: Number, required: true },
    // address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);