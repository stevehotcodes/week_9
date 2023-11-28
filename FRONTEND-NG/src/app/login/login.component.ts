import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { LoginService } from '../services/login.service';
import { using } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup

  constructor(private formBuilder:FormBuilder,private UserSvc:LoginService){}

  ngOnInit():void{
    this.loginForm=this.formBuilder.group({
    
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
   
      })
  }

  onSubmit(){
    if(this.loginForm.valid){
      let UserData=this.loginForm.value
      console.log(this.loginForm.value)
      delete UserData.confirmPassword
      this.UserSvc.logIn(UserData)
    }
    else{
      console.log("cant log in since the form is invalid")
    }

}
}
