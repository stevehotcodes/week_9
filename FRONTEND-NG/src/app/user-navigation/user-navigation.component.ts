import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent {


  constructor(private authSvc:AuthService,private userSvc:UserService){}

  logOut(){
    this.authSvc.signOut()
  }

  getSignedUser(){
    this.userSvc.getSignedInUser().subscribe(
      res=>{
        console.log(res)
      }
   
    )
  }



}
