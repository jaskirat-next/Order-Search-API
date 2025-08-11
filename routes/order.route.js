import express from "express";
import { addOrder, searchOrder } from "../controllers/order.controller.js";

const route = express.Router();

route.post('/addOrder', addOrder)
route.get('/searchOrder', searchOrder)

export default route;