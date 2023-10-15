import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';
import { environment } from 'src/environments/environment.developer';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    super();
  }

  public getAllUser(): Observable<IUser[]> {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`
    };
    return this.http.get<IUser[]>(`${environment.baseURL}/user/`, {
      headers,
    });
  }
}
