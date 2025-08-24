import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:String,
    description:String,
    quantity:Number,
    category:String
})

export const productModel = mongoose.model('Product', productSchema)