import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashmessagesComponent } from '../flashmessages/flashmessages.component';
import { FlashmessagesService } from './flashmessages.service';



export interface INewUserDetails{
  firstname:string
  lastname:string
  email:string
  password:string
}

@Injectable({
  providedIn: 'root'
})



export class SignupService {
   
  baseUrl:string='http://localhost:3000/user'
  constructor(private http:HttpClient,private router:Router,private flashMsgSvc:FlashmessagesService) { }

   registerNewUser(newUserDetails:INewUserDetails){
    this.http.post(this.baseUrl+'/register',newUserDetails).subscribe(
      (res:any)=>{
          console.log(res.message)
          
          this.router.navigate(['/login'])
          this.flashMsgSvc.pushMessage({
            type: 'success',
            message: res.message 
          })
      },
      (error:any)=>{
        this.flashMsgSvc.pushMessage({
          type: 'error',
          message: error.error.message
        })
      }
     )
   }
}
