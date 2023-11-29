import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart:any[]=[]

  constructor(private cartSvc:CartService){}

  ngOnInit(){
    this.getCartItem()
  } 
  
  getCartItem(){
     this.cartSvc.getCart().subscribe(
      (res:any)=>{
        console.log(res)
        this.cart=res
        console.log(this.cart);
        
      }
     )
  }

  removeItemFromCart(itemID:string){
    console.log("id removed",itemID)
    
    this.cartSvc.removeItem(itemID).subscribe(
      res=>{
        console.log(res);
        
      }
    )
  }

}
