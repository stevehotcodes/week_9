import { Router } from "express";
import { cancelOrder, createAnOrder, getAllOrders, getAnOrderByStatus, getOrderById, getOrdersByUser, updateOrdertoShipped, updateOrdertoShipping } from "../controllers/orderControllers";
import { accountRequired, adminPrivilege } from "../middlewares/verifyTokens";




const orderRouter=Router();
orderRouter.get('/all',adminPrivilege,getAllOrders)
orderRouter.get('/user',accountRequired,getOrdersByUser);
orderRouter.post('/new',accountRequired,createAnOrder)
orderRouter.patch('/:id',accountRequired,cancelOrder);
orderRouter.get('/:id', accountRequired,getOrderById);
orderRouter.get("/status",accountRequired,getAnOrderByStatus);
orderRouter.put("/status/shipping/:id",adminPrivilege,updateOrdertoShipping);
orderRouter.put("/status/shipped/:id",adminPrivilege,updateOrdertoShipped);








export default orderRouter