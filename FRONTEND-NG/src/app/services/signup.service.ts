import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



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
  constructor(private http:HttpClient,private router:Router) { }

   registerNewUser(newUserDetails:INewUserDetails){
    this.http.post(this.baseUrl+'/register',newUserDetails).subscribe(
      (res:any)=>{
          console.log(res.message)
          this.router.navigate(['/login'])
      }
     )
   }
}
