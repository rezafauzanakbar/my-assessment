import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IUser } from 'src/app/interfaces/i-user';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-participant-all',
  templateUrl: './participant-all.component.html',
  styleUrls: ['./participant-all.component.css']
})
export class ParticipantAllComponent implements OnInit {

  // get data participant
  participant: IUser[] = []

  // jumlah participant
  countParticipant: number

  // efek Loading
  isLoading: boolean;

  // Search
  keyword: string

  constructor(private userService: UserService) {
    this.countParticipant = 0
    this.isLoading = true;
    this.keyword = ""
  }

  ngOnInit(): void {
    this.getAllParticipant()
  }

  getAllParticipant() {
    this.userService.getAllUser().pipe(catchError(this.handleError)).subscribe((resp: any) => {
      this.participant = resp.data
      this.isLoading = false;
      this.countParticipant = this.participant.length
    })
  }

  search(keyword: string) {
    if (keyword != "") {
      // Mencari data yang cocok dengan kata kunci
      this.participant = this.participant.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      // Jika tidak ada kata kunci, tampilkan semua data
      this.getAllParticipant()
    }
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
