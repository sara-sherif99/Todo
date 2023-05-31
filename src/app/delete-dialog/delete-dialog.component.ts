import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TodoDialogComponent, DialogData } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  cookie_name:any="";
  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Delete(){
    this.cookie_name=this.cookieService.get('token');
    var token=this.cookieService.get('token');
    var headers_object = new HttpHeaders().set(
      'authorization',token
   );
    var url = 'http://localhost:3000/'+this.data.id;
    this.http.delete<any>(url,{headers:headers_object}).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    );
    location.reload();
    this.dialogRef.close();
  }
}
