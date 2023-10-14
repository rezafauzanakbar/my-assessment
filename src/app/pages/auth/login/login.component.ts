import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean;
  resultLogin: any = ""
  user = { username: "", password: "" }

  constructor(private authService: AuthService, private router: Router) {
    this.isLoading = false;
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.user.username != "" && this.user.password != "") {
      this.isLoading = true;
      this.authService.login(this.user).pipe(catchError(this.handleError))
        .subscribe((respon: IUser) => {
          this.resultLogin = respon;
          if (this.resultLogin.data.isAdmin == true) {
            localStorage.setItem("token", this.resultLogin.data.token)
            Swal.fire('Login Success!', '', 'success');
            this.router.navigate(['/home']);
          } else if (this.resultLogin.data.isAdmin != true) {
            Swal.fire('Sorry, you are not admin!', '', 'error');
            this.isLoading = false;
            this.router.navigate(['']);
          }
        })
    } else {
      Swal.fire('Please, input the field!', '', 'error');
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
