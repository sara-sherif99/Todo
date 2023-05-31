import { HttpClient } from '@angular/common/http';
import { Component,Inject } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { EditDailogComponent } from '../edit-dailog/edit-dailog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

export interface DialogData {
  title: string;
  content:string;
  deadline: string;
  dateCreated:string;
  id:any; 
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private cookieService: CookieService,private http: HttpClient,public dialog: MatDialog,private router: Router) {};
  toggle : boolean = false;
  isHidden = false;
  user:any={};
  todos:any=[];
  cookie_name:any;

  title: any="";
  content:any="";
  deadline: any="";
  id:any="";

  ngOnInit(): void{
    this.cookie_name=this.cookieService.get('token');
    var token=this.cookie_name;
    this.http.post<any>('http://localhost:3000/home', {token}).subscribe(
      (response) => {
        this.user=response.user;
        this.todos=response.user.todos;
        console.log(this.user,this.todos);
      },
      (error) => console.log(error)
    );
  }

  clickEvent(){
   this.toggle = !this.toggle;       
  }

  show(event:any){
    event.target.classList.toggle('show');
  }
  
  
  AddTodo(but1:any){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '300px',
      position: { top: '15vh',
      left: '40vw'} ,
      data: {title: this.title, content: this.content, deadline: this.deadline}
    });

    dialogRef.afterClosed().subscribe(result => {
      but1.classList.toggle('active')
    });
  }
  EditTodo(todo:any){
    this.id=todo.id;
    this.title=todo.title;
    this.content=todo.content;
    this.deadline=todo.deadline;
    const dialogRef = this.dialog.open(EditDailogComponent, {
      width: '300px',
      position: { top: '15vh',
      left: '40vw'} ,
      data: {title: this.title, content: this.content, deadline: this.deadline, id:this.id}
    });
  }
  DeleteTodo(todo:any){
    this.id=todo.id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      position: { top: '30vh',
      left: '40vw'} ,
      data: {id:this.id}
    });
  }
  Logout(){
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '300px',
      position: { top: '15vh',
      left: '40vw'} 
    });
  }
}


function DialogPosition(): import("@angular/material/dialog").DialogPosition | undefined {
  throw new Error('Function not implemented.');
}
