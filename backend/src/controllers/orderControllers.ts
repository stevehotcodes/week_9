import { Request,Response} from "express";
import Connection from "../dbhelpers/dbhelpers";
import {v4} from 'uuid'
import { ExtendedUser } from "../middlewares/verifyTokens";
import { Iorder, IorderDetailsWithUserInfo, IorderItemInfo, IorderWithInfo, Tstatus } from "../interfaces/orderInterface";
import { IProduct } from "../interfaces/productInterface";
import { IcartItem } from "../interfaces/cartInterface";



const databaseConnection=new Connection ()


export const createAnOrder=async(req:ExtendedUser,res:Response)=>{
    try {
        const userID=req.info?.id!
        const orderID=v4();
        const cart=(await databaseConnection.execute('getCart',{userID})).recordset
        
        // const product:IProduct=await databaseConnection.execute('getProductById',{id:cart.})
    
        //check contents of the cart
        if(!cart.length){
            return res.status(404).json({message:"You cart is empty"});
        }
        //if cart is not empty make the order
        await databaseConnection.execute('createNewOrder',{id:orderID,userID})
        let orderSumTotal=0
        //shift the cart to sales 
        for(const item of cart){
            console.log("item details",item)
            orderSumTotal+=(item.price*item.quantity)
            const salesId=v4()
            await databaseConnection.execute('addSalesItem',{productID:item.productID,quantity:item.quantity,price:item.price,orderID,id:salesId});
            
        }
        //if successful remove the cart content to empty
        await databaseConnection.execute('clearCart',{userID});
        
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

export const cancelOrder =async(req:ExtendedUser,res:Response)=>{
    try{
        const userID=req.info?.id!
        const {id}=req.params;
        const order=(await databaseConnection.execute('getAnOrderById',{id})).recordset[0]

        if(!order){
            return res.status(404).json({message:"order does not exist"});
        }
        if(req.info?.role! !='admin' || order.userID!=userID){
            return res.status(404).json({message:"Unauthorized"})
        }
        await databaseConnection.execute('cancelOrderById',{id});

        return res.status(200).json({message:"order cancelled"})

    }
    catch(error:any){
        return res.status(500).json({error:error.message})
    }
}

export const getOrdersByUser=async(req:ExtendedUser,res:Response)=>{
    try {

        const userID=req.info?.id!
        const orders:IorderDetailsWithUserInfo[]=await(await databaseConnection.execute('getOrdersByUser',{userID})).recordset
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

export const getOrderById=async(req:ExtendedUser,res:Response)=>{
    try {

        const {id}=req.params
        const order:IorderWithInfo[]=(await databaseConnection.execute('getAnOrderById',{id})).recordset

        if(!order.length){
            return res.status(404).json({message:"order not found or does not exist"})
        }
        if(req.info?.id==order[0].userID || req.info?.role=="admin"){
        // let orderWithInfo:Partial<IorderWithInfo> = {id:order[0].id as string, status: orderItems[0].status as Tstatus, userID: orderItems[0].userID as string, orderDate:orderItems[0].orderDate as string}
        // let orderItemsWithInfo:IorderItemInfo[] = orderItems.map((item) => {})
            return res.status(200).json(order)
        }
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getAllOrders=async(req:ExtendedUser,res:Response)=>{
    try{
        let orders:Iorder[]=(await databaseConnection.execute('getAllOrders')).recordset;
        if(!orders){
            return res.status(404).json({message:"no orders found"});
        }
        return res.status(200).json(orders)
    }
    catch(error:any){
        return res.status(500).json({error:error.message})
    }


}
export const getAnOrderByStatus=async(req:Request<{status:string,id:string}>,res:Response)=>{
    try {
            const{orderStatus,id}=req.body
            const order= (await databaseConnection.execute('getAnOrderByStatus',{orderStatus,id})).recordset[0];

            if(!order){
                return res.status(404).json({message:"no orders found with that status"})
            }
            return res.status(200).json(order)
    } 
    catch (error:any) 
    {
        return res.status(500).json({error:error.message})
    }


}

export const updateOrdertoShipping=async (req:ExtendedUser,res:Response)=>{
    try {
         const {id}=req.params;
         const order:IorderWithInfo[]=(await databaseConnection.execute('getAnOrderById',{id})).recordset
         if(!order.length){
            return res.status(404).json({message:"order not found or does not exist"})
        }
        if(req.info?.id==order[0].userID || req.info?.role=="admin"){
            await databaseConnection.execute('updateOrdertoShipping',{id})
            return res.status(200).json({message:"order status switched to shipping"})
        }


        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

export const updateOrdertoShipped=async (req:ExtendedUser,res:Response)=>{
    try {
         const {id}=req.params;
         const order:IorderWithInfo[]=(await databaseConnection.execute('getAnOrderById',{id})).recordset
         if(!order.length){
            return res.status(404).json({message:"order not found or does not exist"})
        }
        if(req.info?.id==order[0].userID || req.info?.role=="admin"){
            await databaseConnection.execute('updateOrdertoShipped',{id})
            return res.status(200).json({message:"order status switched to shipped"})
        }
            
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

export const updateOrdertoDelivered=async (req:ExtendedUser,res:Response)=>{
    try {
         const {id}=req.params;
         const order:IorderWithInfo[]=(await databaseConnection.execute('getAnOrderById',{id})).recordset
         if(!order.length){
            return res.status(404).json({message:"order not found or does not exist"})
        }
        if(req.info?.id==order[0].userID || req.info?.role=="admin"){
            await databaseConnection.execute('updateOrdertoDelivered',{id})
            return res.status(200).json({message:"order status switched to delivered"})
        }
            
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

