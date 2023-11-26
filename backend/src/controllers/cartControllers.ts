import { Request,Response } from "express";
import {v4} from "uuid"
import DatabaseHelper from "../helpers/dbConnectionHelper";
import dotenv from 'dotenv'


const databaseConnection=DatabaseHelper.getInstance();


export const getCart=async(req:Request,res:Response)=>{
    try {
         const cart=(await databaseConnection.exec('getCart',{userID:req.info?.id!})).recordset
         if(!cart.length){
            return res.status(404).json({message:'your cart is empty'});
         }
         return res.status(200).json(cart)
        
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const addItem=async (req:Request,res:Response)=>{
    try{
        const userID=req.info?.id
        const {productID}=req.body
        const cart=(await databaseConnection.exec('getCart',{userID:req.info?.id!})).recordset
        let cartItem=cart.filter((item)=>{return item.userID===userID&&item.productID===productID})[0]
        
        if(cartItem){
            await databaseConnection.exec('updateCartItemQuantity',{id,quantity})
            return res.status(200).json({message:"cart item quantity updated"})
        }
        else{
            const id=v4();  
            await databaseConnection.exec('addCartItem',{id,userID,productID})
            return res.status(201).json({message:"item added to cart"})
        }

    }
    catch(error:any){
        return res.status(500).json({message:error.message})
    }
}

export const deleteCartItem=async(req:Request,res:Response)=>{
    try {
        const userID=req.info?.id
        const {itemID}=req.params
        const cart=(await databaseConnection.exec('getCart',{userID})).recordset
        let cartItem=cart.filter((item)=>{return item.id===itemID})[0]
        
        if(cartItem){
            await databaseConnection.exec('deleteCartItem',{id:itemID})
            return res.status(200).json({message:"cart item quantity deleted"})
        }
        else{
            return res.status(404).json({message:'item not in the cart'})
        }

    } catch (error:any) {
        return res.status(500).json({message:error.message})
        
    }
}

export  const clearCart=async (req:Request,res:Response)=>{
    try {
          let userID=req.info?.id
          await databaseConnection.exec('clearCart',{userID})
          return res.status(200).json({message:"cart cleared"})
        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
        
    }
}

export const updateCartItemQuantity=async(req:Request,res:Response)=>{
    try{
        const userID=req.info?.id
        const{quantity}=req.body
        const id=req.params.itemID
        const cart=(await databaseConnection.exec('getCart',{userID:req.info?.id!})).recordset
        let cartItem=cart.filter((item)=>{return item.id==id})[0]

        if(cartItem){
            await databaseConnection.exec('updateCartItemQuantity',{id,quantity})
            return res.status(200).json({message:'Cart Item Updated'})
        }
        else{
            return res.status(404).json({message:'Item not in the cart'})
        }

    }
    catch(error:any){
        return res.status(500).json({message:error.message})

    }
}