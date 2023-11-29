import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent  implements OnInit{
  [x: string]: any;
  
  orders:Iorder[]=[]
  isOnTransit:boolean=false
  isCanceled:boolean=false
  isDelivered:boolean=false
  id!:string
   constructor(private orderSvc:OrdersService,private rt:ActivatedRoute){}
   

   ngOnInit(){
    this.orderSvc.getAllOrders().subscribe(
        res=>{
          console.log(res)
          this.orders=res
        }

    )
    
      this.id=this.rt.snapshot.params['id']
    

   }
   onTransit(id:string){
   for(let order of this.orders){
     if(order.orderStatus==='processing'){
      console.log(this.id)
      console.log("i am on transit")
      this.isOnTransit=true
      this.isDelivered=false
      this.isCanceled=false
     }
  }
  // this.orderSvc.updateOrdertoShipping(this)
     
   }


}

export interface Iorder{
  id:string
  orderStatus:string
  orderDate:string
  userID:string
}