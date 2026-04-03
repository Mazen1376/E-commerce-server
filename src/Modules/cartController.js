import { cartModel } from '../db/models/cartModel.js'
import { orderModel } from '../db/models/orderModel.js'
import { productModel } from '../db/models/productModel.js'
import { catchAsync } from '../util/catchAsync.js'

const getUserCart = catchAsync(async (req, res) => {
    const userCart = await cartModel.findOne({ userId: req.decoded._id }).populate('products.productId')
    res.json(userCart)
})

const getAllCarts = catchAsync(async (req, res) => {
    const carts = await cartModel.find().populate('products.productId')
    res.json({ message: "all carts", carts })
})

const addToCart = catchAsync(async (req, res) => {
    const { id } = req.params
    const { quantity } = req.body
    const userId = req.decoded._id

    let cart = await cartModel.findOne({ userId });
    if (!cart) {
        cart = await cartModel.create({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === id);
    const validQuantity = quantity || 1;

    if (productIndex > -1) {
        cart.products[productIndex].quantity += validQuantity;
    } else {
        cart.products.push({ productId: id, quantity: validQuantity });
    }

    await cart.save();
    res.status(201).json(cart)
})

const decrementFromCart = catchAsync(async (req, res) => {
    const { id } = req.params
    const userId = req.decoded._id
    
    const cart = await cartModel.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" })

    const productIndex = cart.products.findIndex(p => p.productId.toString() === id);
    if (productIndex > -1) {
        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
        } else {
            cart.products.splice(productIndex, 1);
        }
        await cart.save();
    }

    res.json({ message: "Updated successfully", cart })
})

const deleteFromCart = catchAsync(async (req, res) => {
    const { id } = req.params
    const userId = req.decoded._id

    const updatedCart = await cartModel.findOneAndUpdate(
        { userId },
        { $pull: { products: { productId: id } } },
        { new: true }
    )
    res.json({ updatedCart })
})

const createOrder = catchAsync(async (req, res) => {
    const userId = req.decoded._id
    const cart = await cartModel.findOne({ userId })
    
    if (!cart || cart.products.length === 0) {
        return res.status(400).json({ message: "Your cart is empty" })
    }

    const cartProducts = cart.products

    // 1. Validate stocks
    for (const item of cartProducts) {
        const product = await productModel.findById(item.productId)
        if (!product || product.quantity < item.quantity) {
            return res.status(400).json({ 
                message: `Product ${product?.name || 'Unknown'} is out of stock or has insufficient quantity.` 
            })
        }
    }

    // 2. Create Order
    const orderData = {
        ...req.body,
        createdBy: userId,
        products: cartProducts
    }
    const createdOrder = await orderModel.create(orderData)

    // 3. Update Inventory (Decrement)
    for (const item of cartProducts) {
        await productModel.findByIdAndUpdate(item.productId, {
            $inc: { quantity: -item.quantity }
        })
    }

    // 4. Clear Cart
    await cartModel.findOneAndUpdate({ userId }, { $set: { products: [] } })

    res.status(201).json({ message: "Order placed successfully", order: createdOrder })
})

export {
    getUserCart,
    getAllCarts,
    addToCart,
    decrementFromCart,
    deleteFromCart,
    createOrder
}