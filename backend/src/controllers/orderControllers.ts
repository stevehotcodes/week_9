import { Request,Response} from "express";
import DatabaseHelper from "../helpers/dbConnectionHelper";
import {v4} from 'uuid'



const databaseConnection=DatabaseHelper.getInstance()


export const createAnOrder=async(req:Request,res:Response)=>{
    try {
        const userID=req.info?.id!
        const orderID=v4();
        const cart=(await databaseConnection.exec('getCart',{userID})).recordset
        //check contents of the cart
        if(!cart.length){
            return res.status(404).json({message:"You cart is empty"});
        }
        //if cart is not empty make the order
        await databaseConnection.exec('createNewOrder',{id:orderID,userID})
        let orderSumTotal=0
        //shift the cart to sales 
        for(const item of cart){
            orderSumTotal+=item.price
            const salesId=v4()
            await databaseConnection.exec('addSalesItem',{productID:item.productID,quantity:item.quantity,price:item.price,orderID,id:salesId});
            
        }
        //if successful remove the cart content to empty
        await databaseConnection.exec('clearCart',{userID});
        
        return res.status(201).json(
            {
                message:"order created successfully",
                orderSumTotal,
                itemsOrdered:cart.length,
                orderID
            }
        )

    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const cancelOrder =async(req:Request,res:Response)=>{
    try{
        const userID=req.info?.id!
        const {id}=req.params;
        const order=(await databaseConnection.exec('getAnOrderById',{id})).recordset[0]

        if(!order){
            return res.status(404).json({message:"order does not exist"});
        }
        if(req.info?.role! !='admin' || order.userID!=userID){
            return res.status(404).json({message:"Unauthorized"})
        }
        await databaseConnection.exec('cancelOrderById',{id});

        return res.status(200).json({message:"order cancelled"})

    }
    catch(error:any){
        return res.status(500).json({error:error.message})
    }
}

export const getOrdersByUser=async(req:Request,res:Response)=>{
    try {

        const userID=req.info?.id
        const orders=await(await databaseConnection.exec('getOrdersByUser',{userID})).recordset
        if(orders.length){
            return res.status(200).json(orders)
        }
        else{
            return res.status(404).json({message:"no orders found made by the user"})
        }
               
        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

export const getOrderById=async(req:Request,res:Response)=>{
    try {

        const {id}=req.params
        const orderItems=(await databaseConnection.exec('getAnOrderById',{id})).recordset

        if(!orderItems.length){
            return res.status(404).json({message:"order not found or does not exist"})
        }
        if(req.info?.id==orderItems[0].userID || req.info?.role=="admin"){
            
        }
        
    } catch (error) {
        
    }
}