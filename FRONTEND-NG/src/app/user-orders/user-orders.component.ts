import { Component, OnInit } from '@angular/core';
import { UserNavigationComponent } from '../user-navigation/user-navigation.component';
import { IorderDetailsWithUserInfo, OrdersService } from '../services/orders.service';
@Component({
  selector: 'app-user-orders', 
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit{

  orders:IorderDetailsWithUserInfo[]=[]
  constructor(private orderSvc:OrdersService){}

  ngOnInit(){
      this.getAllOrders()
  }
      

  getAllOrders(){
    this.orderSvc.getOrdersByUser().subscribe(
      res=>{
        console.log(res)
        this.orders=res
        console.log(this.orders)
      }
    )
  }
}
