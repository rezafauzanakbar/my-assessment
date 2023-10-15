import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assessment } from '../models/assessment-modelnew';
import { environment } from 'src/environments/environment.developer';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  createAssessment(assessment: Assessment): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    };
    return this.http.post(`${environment.baseURL}/assessment/`, assessment, {
      headers,
    });
  }
}
