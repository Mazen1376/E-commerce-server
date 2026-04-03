import { Router } from "express";
import express from 'express'
import { deleteUser, getuser, getUserProfile, getUsers, login, register, updateUser, verifyEmail } from "./userController.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";
import { verifyUserToken } from "../middleware/verifyCartToken.js";

export const userRoutes = Router()

userRoutes.use(express.json())

userRoutes.get('/users/profile', verifyUserToken, getUserProfile)
userRoutes.get('/users/:id', getuser)
userRoutes.post('/users', register)
userRoutes.post('/users/login', login)
userRoutes.get('/users/verify/:email', verifyEmail)
userRoutes.put('/users/:id', updateUser)
//userRoutes.post('/users/logout', logoutUser)   // to do (delete token)
userRoutes.get('/users', verifyAdminToken, getUsers)
userRoutes.delete('/users/:id', verifyAdminToken, deleteUser)
