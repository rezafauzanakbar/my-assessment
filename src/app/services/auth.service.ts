import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';
import { environment } from 'src/environments/environment.developer';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return localStorage.getItem("token") ? true : false;
  }

  public login(user: any): Observable<any> {
    const headers = {
      "Content-Type": "application/json"
    }
    return this.http.post<any>(
      `${environment.baseURL}/auth/login`,
      JSON.stringify(user),
      { headers }
    )
  }

  public register(user: IUser): Observable<any> {
    const headers = {
      "Content-Type": "application/json"
    }
    return this.http.post<any>(
      `${environment.baseURL}/auth/register`,
      JSON.stringify(user),
      { headers }
    )
  }
}

export const authGuard = (): void | boolean => {
  const userService: AuthService = inject(AuthService);
  const router: Router = inject(Router);


  if (userService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/']);
}




