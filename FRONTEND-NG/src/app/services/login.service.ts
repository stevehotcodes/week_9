import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

export interface IUserCredentials{
  email:string
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl:string=`http://localhost:3000/user/login`
  constructor(private http:HttpClient,private authSvc:AuthService) { }


  logIn(userCredential:IUserCredentials){
     this.http.post(this.baseUrl,userCredential).subscribe(
        (res:any)=>{
              console.log(res)
              this.authSvc.signin({email:res.email, token:res.token})
        }

     )

      
  }
}
