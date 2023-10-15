import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAssessment } from 'src/app/interfaces/i-assessment';
import { format } from 'date-fns';
import { AssessmentService } from 'src/app/services/assessment.service';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.component.html',
  styleUrls: ['./assessment-detail.component.css']
})
export class AssessmentDetailComponent implements OnInit, OnDestroy {

  // untuk button active
  isQuestionActive: Boolean;
  isParticipantActive: Boolean;

  // Untuk component show component question dan juga participant
  showQuestion: Boolean;
  showParticipant: Boolean;

  // Untuk get data detail
  subscribe: Subscription | undefined
  assessment: IAssessment[] = []

  // properti assessment
  title: string = ""
  endDate: Date = new Date()

  // untuk mengirim ke component participant
  participant: [] = []

  // pemberian status
  status: string
  currentDate: Date

  constructor(
    private activatedRoute: ActivatedRoute,
    private assessmentService: AssessmentService
  ) {

    // // untuk button active
    this.isQuestionActive = true
    this.isParticipantActive = false

    // Untuk component show component question dan juga participant
    this.showQuestion = true
    this.showParticipant = false

    // Untuk pemberian status
    this.status = ""
    this.currentDate = new Date()
  }

  ngOnInit(): void {
    this.getDataDetail()
  }

  getDataDetail() {
    this.subscribe = this.activatedRoute.paramMap.subscribe((params: any) => {
      this.assessmentService.getDetail(params.get('id'))
        .subscribe((resp: any) => {
          this.assessment = resp
          console.log(this.assessment);

          this.title = resp.data.title
          this.endDate = new Date(resp.data.endDate)

          // untuk mengambil data participant
          this.participant = resp.data.participants

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
    } else if (button === 'participant') {
      this.isQuestionActive = false;
      this.isParticipantActive = true;
    }
  }

  toggleQuestion() {
    this.showQuestion = true;
    this.showParticipant = false;
  }

  toggleParticipant() {
    this.showQuestion = false;
    this.showParticipant = true;
  }
}
