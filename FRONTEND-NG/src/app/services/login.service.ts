import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FlashmessagesService } from './flashmessages.service';

export interface IUserCredentials{
  email:string
  password:string
}

export interface loginResult{
  message:string
  email:string
  token:string
  role:string

}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string=`http://localhost:3000/user/login`
  constructor(private http:HttpClient,private authSvc:AuthService,private route:Router,private flashMsgSvc:FlashmessagesService) { }


  logIn(userCredential:IUserCredentials){
     this.http.post(this.baseUrl,userCredential).subscribe(
        (res:any)=>{
              console.log(res)
             
              this.authSvc.signin({email:res.email,token:res.token})
              this.flashMsgSvc.pushMessage({
                type:'success',
                message:res.message
              })
              if(res.role=='admin'){
                this.route.navigate(['/admin'])
              }
              else{
                this.route.navigate(['/user'])
              }
              
        },
        (error:any)=>{
          this.flashMsgSvc.pushMessage({
            type:'error',
            message:"Unauthorized or invalid credentials"
          })
        }

     )

      
  }
}
