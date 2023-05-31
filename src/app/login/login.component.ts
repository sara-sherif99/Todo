import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorHandle:any;
  msg:any;
  constructor(private http: HttpClient,private cookieService: CookieService,private router: Router) {};

  form = new FormGroup({
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null,Validators.required),
    
  });

  Login() {
    var email=this.form.controls["email"].value;
    var password=this.form.controls["password"].value;
    if(this.form.get('password')?.valid && this.form.get('email')?.valid){
    this.http.post<any>('http://localhost:3000/login', {email,password}).subscribe(
      (response) => {
        this.cookieService.set('token',response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorHandle=true;
        this.msg=error.error.message;
      }
    );
    }
  };

}
