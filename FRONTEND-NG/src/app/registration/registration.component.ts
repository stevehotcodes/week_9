import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    signupForm!:FormGroup

    constructor(private formBuilder:FormBuilder,private UserSvc:SignupService){}

    ngOnInit():void{
      this.signupForm=this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
       confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        })
    }

    onSubmit(){
      if(this.signupForm.valid){
        let newUserData=this.signupForm.value
        console.log(this.signupForm.value)
        delete newUserData.confirmPassword
        this.UserSvc.registerNewUser(newUserData)
      }
      else{
        console.log("cant register since the form is invalid")
      }

    }

}
