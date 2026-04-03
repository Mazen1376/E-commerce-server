import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from '../db/models/userModel.js'
import { sendEmail } from '../util/sendEmail.js'
import { cartModel } from '../db/models/cartModel.js'
import { catchAsync } from '../util/catchAsync.js'

const getUsers = catchAsync(async (req, res) => {
    const users = await userModel.find()
    res.json(users)
})

const getuser = catchAsync(async (req, res) => {
    const { id } = req.params
    const user = await userModel.findById(id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
})

const getUserProfile = catchAsync(async (req, res) => {
    const id = req.decoded._id
    const userProfile = await userModel.findById(id)
    res.json(userProfile)
})

const register = catchAsync(async (req, res) => {
    const exist = await userModel.findOne({ email: req.body.email })
    if (exist) return res.status(409).json({ message: "Email already registered" })

    req.body.password = await bcrypt.hash(req.body.password, 8)

    // Fix: replace insertOne with create
    const registeredUser = await userModel.create(req.body)
    const userId = registeredUser._id

    if (!registeredUser.isAdmin) {
        // Fix: replace insertOne with create
        await cartModel.create({ userId })
    }

    sendEmail(req.body.email)

    const userResponse = registeredUser.toObject()
    delete userResponse.password
    delete userResponse.isAdmin
    
    res.status(201).json({ message: "Registered successfully", user: userResponse })
})

const login = catchAsync(async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({ message: "Invalid email or password" })

    const passwordMatched = await bcrypt.compare(req.body.password, user.password)
    if (!passwordMatched) return res.status(401).json({ message: "Invalid email or password" })

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

    res.status(200).json({ token, isAdmin: user.isAdmin })
})

const updateUser = catchAsync(async (req, res) => {
    const { id } = req.params
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8)
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
    res.json({ message: "Updated successfully", updatedUser })
})

const verifyEmail = catchAsync(async (req, res) => {
    const { email } = req.params
    jwt.verify(email, process.env.JWT_SECRET, async (error, decoded) => {
        if (error) return res.status(401).json({ message: "Invalid or expired token" })
        await userModel.findOneAndUpdate({ email: decoded.email }, { isConfirmed: true })
        res.json({ message: "Email verified successfully" })
    })
})

const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params
    const deletedUser = await userModel.findByIdAndDelete(id)
    res.json({ message: "Deleted successfully", deletedUser })
})

export {
    getUserProfile,
    getuser,
    register,
    login,
    updateUser,
    verifyEmail,
    getUsers,
    deleteUser
}



