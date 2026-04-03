import { Router } from "express";
import express from 'express'
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";
import { verifyUserToken } from "../middleware/verifyCartToken.js";
import { addOrder, deleteOrder, getorder, getOrders, getUserOrder, updateOrder } from "./orderController.js";

export const orderRoutes = Router()

orderRoutes.use(express.json())

orderRoutes.get('/orders', verifyAdminToken, getOrders)
orderRoutes.get('/orders/:id', getorder)
orderRoutes.get('/userOrder',verifyUserToken, getUserOrder)
orderRoutes.post('/orders', verifyAdminToken, addOrder)
orderRoutes.put('/orders/:id', verifyUserToken, updateOrder)
orderRoutes.delete('/orders/:id', verifyAdminToken, deleteOrder)
