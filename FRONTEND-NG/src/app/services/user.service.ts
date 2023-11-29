import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignedUserDetails } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getLoggedUser() {
	  throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  getSignedInUser():Observable<ISignedUserDetails>{
    return this.http.get<ISignedUserDetails>('http://localhost:3000/user/logged')
}
}
