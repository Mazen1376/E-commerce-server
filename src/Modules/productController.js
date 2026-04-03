import { productModel } from '../db/models/productModel.js'
import { catchAsync } from '../util/catchAsync.js'

const getProducts = catchAsync(async (req, res) => {
    const products = await productModel.find()
    res.json(products)
})

const getProduct = catchAsync(async (req, res) => {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.json(product)
})

const addProduct = catchAsync(async (req, res) => {
    const exist = await productModel.findOne({ name: req.body.name })
    if (exist) return res.status(409).json({ message: "Product already exists" })

    const addedProduct = await productModel.create(req.body)
    res.status(201).json({ message: "Added successfully", addedProduct })
})

const updateProduct = catchAsync(async (req, res) => {
    const { id } = req.params
    const updatedProduct = await productModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Updated successfully", updatedProduct })
})

const deleteProduct = catchAsync(async (req, res) => {
    const { id } = req.params
    const deletedProduct = await productModel.findByIdAndDelete(id)
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" })
    res.json({ message: "Deleted successfully", deletedProduct })
})

export {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}



