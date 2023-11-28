import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

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
  constructor(private http:HttpClient,private authSvc:AuthService,private route:Router) { }


  logIn(userCredential:IUserCredentials){
     this.http.post(this.baseUrl,userCredential).subscribe(
        (res:any)=>{
              console.log(res)
             
              this.authSvc.signin({email:res.email,token:res.token})
              if(res.role=='admin'){
                this.route.navigate(['/admin'])
              }
              
        }

     )

      
  }
}
