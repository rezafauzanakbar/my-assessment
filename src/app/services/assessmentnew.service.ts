import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assessment } from '../models/assessment-modelnew';
import { environment } from 'src/environments/environment.developer';

@Injectable({
  providedIn: 'root',
})
export class AssessmentServiceNew {
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

  updateParticipantList(id: number, idList: number[]) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    };
    const url = `${environment.baseURL}/assessment/${id}/participant`;
    console.log(url);
    return this.http.put(
      url,
      { idList },
      {
        headers,
      }
    );
  }
}
