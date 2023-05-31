import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TodoDialogComponent, DialogData } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    private cookieService: CookieService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Logout(){
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }
}
