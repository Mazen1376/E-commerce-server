import { orderModel } from '../db/models/orderModel.js'
import { catchAsync } from '../util/catchAsync.js'

const getOrders = catchAsync(async (req, res) => {
    const orders = await orderModel.find().populate('createdBy', 'name email').populate('products.productId')
    res.json({ orders })
})

const getorder = catchAsync(async (req, res) => {
    const { id } = req.params
    const order = await orderModel.findById(id).populate('createdBy', 'name email').populate('products.productId')
    if (!order) return res.status(404).json({ message: "Order not found" })
    res.json(order)
})

const getUserOrder = catchAsync(async (req, res) => {
    // Return ALL orders for the user, not just one.
    const userOrders = await orderModel.find({ createdBy: req.decoded._id }).populate('products.productId')
    res.json(userOrders)
})

const addOrder = catchAsync(async (req, res) => {
    const orderData = { ...req.body, createdBy: req.decoded._id }
    const addedOrder = await orderModel.create(orderData)
    res.status(201).json({ message: "Order added successfully", addedOrder })
})

const updateOrder = catchAsync(async (req, res) => {
    const { id } = req.params
    const updatedOrder = await orderModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" })
    res.json({ message: "Updated successfully", updatedOrder })
})

const deleteOrder = catchAsync(async (req, res) => {
    const { id } = req.params
    const deletedOrder = await orderModel.findByIdAndDelete(id)
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" })
    res.json({ message: "Deleted successfully", deletedOrder })
})

export {
    getOrders,
    getUserOrder,
    getorder,
    updateOrder,
    addOrder,
    deleteOrder
}