import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IAssessment } from 'src/app/interfaces/i-assessment';
import { IUser } from 'src/app/interfaces/i-user';
import { AssessmentModel } from 'src/app/models/assessment-model';
import { ChoiceModel } from 'src/app/models/choice-model';
import { QuestionModel } from 'src/app/models/question-model';
import { ResultModel } from 'src/app/models/result-model';
import { UserModel } from 'src/app/models/user-model';
import { AssessmentService } from 'src/app/services/assessment.service';

// Dummy data for the Choice model
const choice1 = new ChoiceModel();
choice1.id = 1;
choice1.value = "Choice 1";
choice1.questionId = 1;
choice1.isTrue = true;

const choice2 = new ChoiceModel();
choice2.id = 2;
choice2.value = "Choice 2";
choice2.questionId = 1;
choice2.isTrue = false;

// Dummy data for the Question model
const question1 = new QuestionModel();
question1.id = 1;
question1.text = "What is your favorite color?";
question1.type = "choices";
question1.choices = [choice1, choice2];

// Dummy data for the User model
const user1 = new UserModel();
user1.id = 1;
user1.nama = "John Doe";
user1.username = "john";
user1.password = "password123";
user1.email = "john@example.com"

// Dummy data for the Assessment model
const assessment1 = new AssessmentModel();
assessment1.id = 1;
assessment1.title = "Sample Assessment 1";
assessment1.questions = [question1];
assessment1.password = "assessment123";
assessment1.participants = [user1];
assessment1.endDate = new Date("2023-10-1 08:30:00");

// Dummy data for the Result model
const result1 = new ResultModel();
result1.finalScore = 75; // Calculate as needed based on your formula
result1.assessment = assessment1;
result1.answers = []; // You can populate answers here
result1.createdAt = new Date();

// You can create more dummy data as needed

console.log(assessment1); // To see the generated dummy data

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isStatus: boolean;

  // Mengambil data kolom status
  status: string;

  // Mengambil tanggal saat ini
  currentDate: Date;
  endDate: Date;

  // Mengambil data assessments
  assessments: IAssessment

  assessments2: AssessmentModel[] = []

  constructor(private http: HttpClient, private assessmentService: AssessmentService) {
    this.assessments = new AssessmentModel()
    this.currentDate = new Date()
    this.endDate = new Date()
    this.status = ""
    this.isStatus = false
  }

  ngOnInit(): void {
    this.getAssessment()
  }

  getAssessment() {
    this.assessmentService.getAll().pipe(catchError(this.handleError))
    .subscribe((respon:any) => {
      console.log(respon)
    })
    
    this.assessments2 = [assessment1]

    // Mengambil tanggal saat ini
    this.currentDate = new Date();
    console.log(this.currentDate);

    // Mengambil tanggal penutupan dari data Anda (misalnya, dari assessment1.closeDate)
    this.endDate = new Date(assessment1.endDate);
    console.log(this.endDate);


    // Membandingkan tanggal saat ini dengan tanggal penutupan
    if (this.endDate < this.currentDate) {
      // Jika tanggal saat ini melebihi tanggal penutupan, ubah status menjadi "closed"
      this.status = "open"; // Asumsikan Anda memiliki properti "status" dalam model Assessment
    } else {
      // Jika belum melebihi tanggal penutupan, status tetap sama
      this.status = "closed"; // Asumsikan status default adalah "open"
    }

    if (this.status == "open") {
      this.isStatus = true
    } else if (this.status == "closed") {
      this.isStatus = false
    }

    console.log(this.status)
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
