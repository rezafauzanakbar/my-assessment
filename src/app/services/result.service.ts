import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { IResult } from '../interfaces/i-result';
import { environment } from 'src/environments/environment.developer';
import { Observable } from 'rxjs';
import { Iresultall } from '../interfaces/i-result-all';

@Injectable({
  providedIn: 'root'
})
export class ResultService extends BaseService {
  private token = localStorage.getItem('token');

  // https://c8e3-101-128-113-252.ngrok-free.app/api/result/assessment/id
  // https://c8e3-101-128-113-252.ngrok-free.app/api/result/

  constructor(private http: HttpClient) {
    super()
  }

  public getAllResult(): Observable<Iresultall[]> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    };
    return this.http.get<Iresultall[]>(`${environment.baseURL}/result/`, {
      headers,
    });
  }
}
