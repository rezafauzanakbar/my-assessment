import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading: boolean;
  resultLogin: any = ""
  user: IUser

  ngOnInit(): void {
  }

  constructor(private authService: AuthService, private router: Router) {
    this.user = new UserModel();
    this.isLoading = false;
  }

  register(): void {
    if (this.user.username != "" && this.user.password != "" && this.user.email != "" && this.user.nama != "") {
      this.isLoading = true;
      this.authService.register(this.user).pipe(catchError(this.handleError))
        .subscribe((respon: IUser) => {
          this.resultLogin = respon
          Swal.fire('Register Success!', '', 'success');
          this.router.navigate(['']);
        })
    } else {
      Swal.fire('Please input the field', '', 'error');
    }

  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
