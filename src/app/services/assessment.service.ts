import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAssessment } from '../interfaces/i-assessment';
import { environment } from 'src/environments/environment.developer';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService extends BaseService {

  private token = localStorage.getItem("token")

  constructor(private http: HttpClient) {
    super()
  }

  public getAll(): Observable<IAssessment[]> {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.token}`,
    }
    return this.http.get<IAssessment[]>(`${environment.baseURL}/assessment/`, {headers})
  } 
}