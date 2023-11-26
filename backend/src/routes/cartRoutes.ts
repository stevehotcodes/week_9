import { Router } from "express";
import { addItem, clearCart, deleteCartItem, getCart, updateCartItemQuantity } from "../controllers/cartControllers";
import { accountRequired } from "../middlewares/verifyTokens";



const cartRouter=Router()

cartRouter.get('',accountRequired,getCart)
cartRouter.post('',accountRequired,addItem)
cartRouter.delete('/:itemID',accountRequired,deleteCartItem);
cartRouter.delete('',accountRequired,clearCart)
cartRouter.patch('/:itemID',accountRequired,updateCartItemQuantity)




export default cartRouter