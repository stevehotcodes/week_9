import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface IloggedUser{
  email:string,
  token:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  http:HttpClient) { }
  
  signin(loggedUser:IloggedUser) {
    localStorage.setItem('shopieLoggedUseremail', loggedUser.email)
    localStorage.setItem('shopieLoggedUserToken', loggedUser.token)
    window.location.reload()
  }
  signOut(){
    localStorage.removeItem('shopieLoggedUseremail')
    localStorage.removeItem('shopieLoggedUserToken')
    window.location.reload()
  }
  getLoggedUser():Observable<IloggedUser | null> {
    const email = localStorage.getItem('shopieLoggedUseremail')
    const token = localStorage.getItem('shopieLoggedUserToken')
    const loggedUser = email && token ? {email, token} : null

    return new Observable(observer =>  {
      observer.next(loggedUser)
    })
  }


}
