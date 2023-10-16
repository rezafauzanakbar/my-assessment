import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IResult } from 'src/app/interfaces/i-result';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  // mengambil data all result
  result: IResult[] = []

  // mengambil data jumlah result
  countResult: number

  constructor(private resultService: ResultService) {
    this.countResult = 0
  }

  ngOnInit(): void {
    this.getDataResult()
  }

  getDataResult() {
    this.resultService.getAllResult().pipe(catchError(this.handleError)).subscribe((resp: any) => {
      this.result = resp.data
      this.countResult = this.result.length

    })
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

}
