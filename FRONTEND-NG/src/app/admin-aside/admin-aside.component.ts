import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-aside',
  templateUrl: './admin-aside.component.html',
  styleUrls: ['./admin-aside.component.css']
})
export class AdminAsideComponent {

  constructor(private authSvc:AuthService){}

  logOut(){
    this.authSvc.signOut()
  }
}
