import { Router } from "express";
import { addItem, clearCart, deleteCartItem, getCart, updateCartItemQuantity } from "../controllers/cartControllers";



const cartRouter=Router()

cartRouter.get('',getCart)
cartRouter.post('',addItem)
cartRouter.delete('/:itemID',deleteCartItem);
cartRouter.delete('',clearCart)
cartRouter.patch('/:itemID',updateCartItemQuantity)




export default cartRouter