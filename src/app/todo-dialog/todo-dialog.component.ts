import { Component,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export interface DialogData {
  title: string;
  content:string;
  deadline: string;
  dateCreated:string;
  id:any; 
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css']
})
export class TodoDialogComponent {
  minDate = new Date();
  cookie_name:any="";

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  AddTodo(){
    this.data.dateCreated= new Date().toLocaleDateString();
    this.data.id=Date.now();
    this.cookie_name=this.cookieService.get('token');
    var token=this.cookieService.get('token');
    this.http.post<any>('http://localhost:3000/add', {token,todo:this.data}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
    location.reload();
    this.dialogRef.close();
  }
}
