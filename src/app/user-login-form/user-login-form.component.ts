import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  isLoading = false;

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      // successful login:
      (result) => {
        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('token', result.token);
        localStorage.setItem('FavoriteMovies', result.user.FavoriteMovies);
        localStorage.setItem('Email', result.user.Email);
        localStorage.setItem('Birthday', result.user.Birthday);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(`Welcome back, ${result.user.Username}!`, 'OK', {
          duration: 3000
        });
        this.router.navigate(['movies']);
      },
      // unsuccessful login:
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 3000
        });
      });
  }
}
