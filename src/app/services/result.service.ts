import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultService extends BaseService {
  private token = localStorage.getItem('token');

  // https://c8e3-101-128-113-252.ngrok-free.app/api/result/assessment/id

  constructor(private http: HttpClient) {
    super()
  }

  // public getAllResult(): Observable<> {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.token}`,
  //   };
  //   return this.http.get<IAssessment[]>(`${environment.baseURL}/assessment/`, {
  //     headers,
  //   });
  // }
}
