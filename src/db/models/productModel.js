import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    quantity: { type: Number, default: 0, min: 0 },
    category: String,
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: 'https://placehold.co/600x400?text=Product+Image' }
})

export const productModel = mongoose.model('Product', productSchema)