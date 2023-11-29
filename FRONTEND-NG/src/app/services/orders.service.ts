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
}
