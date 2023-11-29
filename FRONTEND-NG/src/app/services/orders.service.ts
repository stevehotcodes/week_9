import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iorder } from '../orders/orders.component';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

 baseUrl:string='http://localhost:3000/order'

  constructor(private http:HttpClient) { }
  
  getAllOrders():Observable<Iorder[]>{
    return this.http.get<Iorder[]>(this.baseUrl +'/all')
    
  }
 
  updateOrdertoShipping(id:string){
      return this.http.put(`${this.baseUrl}/status/shipping/${id}}`,{})
  }

  // orderRouter.get('/user',accountRequired,getOrdersByUser);'
  
  
  getOrdersByUser():Observable<IorderDetailsWithUserInfo[]>{
    // let data:IorderDetailsWithUserInfo[]=[]
     return this.http.get<IorderDetailsWithUserInfo[]>(this.baseUrl+'/user')
   
  }
}

export interface IorderDetailsWithUserInfo{
  id:string[]
  status:string
  orderDate:string
  productID:string
  quantity:number
  userID:string
  productName:string
  price:number
  productImage:string
  customerEmail:string
  customerFirstname:string
  customerLastname:string
}

export type Tstatus = 'processing' | 'shipping' | 'shipped' | 'canceled'