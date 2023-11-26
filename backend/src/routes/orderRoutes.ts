import { Router } from "express";
import { cancelOrder, createAnOrder, getAllOrders, getAnOrderByStatus, getOrderById, getOrdersByUser } from "../controllers/orderControllers";
import { accountRequired, adminPrivilege } from "../middlewares/verifyTokens";




const orderRouter=Router();
orderRouter.get('/all',adminPrivilege,getAllOrders)
orderRouter.get('/user',accountRequired,getOrdersByUser);
orderRouter.post('/new',accountRequired,createAnOrder)
orderRouter.patch('/:id',accountRequired,cancelOrder);
orderRouter.get('/:id', accountRequired,getOrderById);
orderRouter.get("/status",accountRequired,getAnOrderByStatus)






export default orderRouter