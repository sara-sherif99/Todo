import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorHandle:any;
  msg:any;

  constructor(private http: HttpClient,private cookieService: CookieService,private router: Router) {};

  form = new FormGroup({
    name: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required),
    email: new FormControl(null,[Validators.required,Validators.email]),
  });

  Signup(){
    var name=this.form.controls["name"].value;
    var email=this.form.controls["email"].value;
    var password=this.form.controls["password"].value;
    if(this.form.get('password')?.valid && this.form.get('email')?.valid){
    this.http.post<any>('http://localhost:3000/signup', {name,email,password}).subscribe(
      (response) => {
        console.log(response);
        this.cookieService.set('token',response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorHandle=true;
        this.msg=error.error.message;
      }
    );
    }
  }

}
