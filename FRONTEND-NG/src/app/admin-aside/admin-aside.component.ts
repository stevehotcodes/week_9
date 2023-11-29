import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashmessagesService } from '../services/flashmessages.service';

@Component({
  selector: 'app-admin-aside',
  templateUrl: './admin-aside.component.html',
  styleUrls: ['./admin-aside.component.css']
})
export class AdminAsideComponent {

  constructor(private authSvc:AuthService,private flashMsg:FlashmessagesService){}

  logOut(){
    this.authSvc.signOut()
    this.flashMsg.pushMessage({
      type:'info',
      message:"log out successful"
    })
  }
}
