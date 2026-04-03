import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    
    createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User'
    },
    address:String,
    phoneNumber:String,
    products: 
    [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            default : null
        },
        quantity: {
            type: Number,
            default: 1,
        }
    }],
    approved:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true,
})

export const orderModel = mongoose.model('Order', orderSchema)