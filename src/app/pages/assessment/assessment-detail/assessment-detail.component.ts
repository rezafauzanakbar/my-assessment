import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { IAssessment } from 'src/app/interfaces/i-assessment';
import { format } from 'date-fns';
import { AssessmentService } from 'src/app/services/assessment.service';
import { UserService } from 'src/app/services/user.service';
import { AssessmentServiceNew } from 'src/app/services/assessmentnew.service';
import { IUser } from 'src/app/interfaces/i-user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.component.html',
  styleUrls: ['./assessment-detail.component.css']
})
export class AssessmentDetailComponent implements OnInit, OnDestroy {

  // untuk button active
  isQuestionActive: Boolean;
  isParticipantActive: Boolean;
  isAddParticipantActive: Boolean


  // Untuk component show component question dan juga participant
  showQuestion: Boolean;
  showParticipant: Boolean;
  showAddParticipant: Boolean

  // Untuk get data detail
  subscribe: Subscription | undefined
  assessment: IAssessment[] = []

  // properti assessment
  title: string = ""
  endDate: Date = new Date()

  // untuk mengirim ke component participant
  participant: [] = []

  // untuk mengirim ke component question
  question: [] = []

  // mengambil data user
  getparticipant: IUser[] = [];
  participants: IUser[] = [];
  filterParticipant: IUser[] = [];

  // menampung id user untuk add participant
  data: any[] = [];

  // menampung data user
  user: IUser[] = [];
  dataUser: any[] = []

  // Get id Assessment
  idAseesment: any;

  // pemberian status
  status: string
  currentDate: Date

  constructor(
    private activatedRoute: ActivatedRoute,
    private assessmentService: AssessmentService,
    private userService: UserService,
    private assessmentNew: AssessmentServiceNew
  ) {

    // // untuk button active
    this.isQuestionActive = true
    this.isParticipantActive = false
    this.isAddParticipantActive = false

    // Untuk component show component question dan juga participant
    this.showQuestion = true
    this.showParticipant = false
    this.showAddParticipant = false

    // Untuk pemberian status
    this.status = ""
    this.currentDate = new Date()
  }

  ngOnInit(): void {
    this.getDataDetail()
    this.getAllParticipant()
  }

  getAllParticipant() {
    this.userService
      .getAllUser()
      .pipe(catchError(this.handleError))
      .subscribe((response: any) => {
        this.getparticipant = response.data;
        this.assessmentService.getDetail(this.idAseesment);

        this.assessmentService
          .getDetail(this.idAseesment)
          .subscribe((resp: any) => {
            const participants = resp.data.participants;

            // Menyaring data yang tidak ada di participants
            const filteredParticipants = this.getparticipant.filter(
              (getparticipant) => {
                return !participants.some((p: any) => p.id === getparticipant.id);
              }
            );
            this.filterParticipant = filteredParticipants;
            console.log(this.filterParticipant);

          });
      });
  }

  addParti(i: any) {
    this.data.push(i);
    console.log(this.data);

    this.userService.getDetailUser(i).pipe(catchError(this.handleError)).subscribe((response: any) => {
      this.user = response.data
    })

    this.dataUser.push(this.user)
  }

  isIdExists(id: any): boolean {
    return this.data.some((item) => item === id);
  }

  updateParticipant() {
    this.assessmentNew
      .updateParticipantList(this.idAseesment, this.data)
      .subscribe(
        (response) => {
          console.log('Data berhasil diperbarui', response);
        },
        (error) => {
          console.error('Gagal mengirim permintaan', error);
        }
      );
  }

  getDataDetail() {
    this.subscribe = this.activatedRoute.paramMap.subscribe((params: any) => {
      this.idAseesment = params.get('id')
      console.log(this.idAseesment);

      this.assessmentService.getDetail(params.get('id'))
        .subscribe((resp: any) => {
          this.assessment = resp

          this.title = resp.data.title
          this.endDate = new Date(resp.data.endDate)

          // untuk mengambil data participant
          this.participant = resp.data.participants

          // untuk mengambil data question
          this.question = resp.data.questions

          // Merubah format untuk dibandingkan
          const currentDateFormatted = format(this.currentDate, 'yyyy-MM-dd hh:mm:ss');
          const endDateFormatted = format(this.endDate, 'yyyy-MM-dd hh:mm:ss');

          // Untuk memberikan status
          if (endDateFormatted > currentDateFormatted) {
            this.status = "OPEN";
          } else {
            this.status = "CLOSED";
          }

        })
    })
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  toggleButton(button: string) {
    if (button === 'question') {
      this.isQuestionActive = true;
      this.isParticipantActive = false;
      this.isAddParticipantActive = false
    } else if (button === 'participant') {
      this.isQuestionActive = false;
      this.isParticipantActive = true;
      this.isAddParticipantActive = false
    } else if (button === 'addparticipant') {
      this.isQuestionActive = false;
      this.isParticipantActive = false;
      this.isAddParticipantActive = true
    }
  }

  toggleQuestion() {
    this.showQuestion = true;
    this.showParticipant = false;
    this.showAddParticipant = false;
  }

  toggleParticipant() {
    this.showQuestion = false;
    this.showParticipant = true;
    this.showAddParticipant = false;
  }

  toggleAddParticipant() {
    this.showQuestion = false;
    this.showParticipant = false;
    this.showAddParticipant = true;
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
