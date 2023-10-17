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

  // finalscore
  finalScore0to50: any[] = [];
  finalScore51to70: any[] = [];
  finalScore71to100: any[] = [];

  // mengambil data jumlah result
  countResult: number

  finalScore50: number
  finalScore70: number
  finalScore100: number

  constructor(private resultService: ResultService) {
    this.countResult = 0

    this.finalScore50 = 0
    this.finalScore70 = 0
    this.finalScore100 = 0
  }

  ngOnInit(): void {
    this.getDataResult()
  }

  getDataResult() {
    this.resultService.getAllResult().pipe(catchError(this.handleError)).subscribe((resp: any) => {
      this.result = resp.data
      console.log(this.result)


      this.finalScore0to50 = this.result.filter(item => Number(item.finalScore) >= 0 && Number(item.finalScore) <= 50);
      this.finalScore51to70 = this.result.filter(item => Number(item.finalScore) >= 51 && Number(item.finalScore) <= 70);
      this.finalScore71to100 = this.result.filter(item => Number(item.finalScore) >= 71 && Number(item.finalScore) <= 100);

      this.finalScore50 = this.finalScore0to50.length
      this.finalScore70 = this.finalScore51to70.length
      this.finalScore100 = this.finalScore71to100.length

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
