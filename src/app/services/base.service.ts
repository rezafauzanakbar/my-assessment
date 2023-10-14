import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseURLTransaction = "http://localhost:4200/";

  constructor() { }
}
