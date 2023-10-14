import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-detail',
  templateUrl: './assessment-detail.component.html',
  styleUrls: ['./assessment-detail.component.css']
})
export class AssessmentDetailComponent implements OnInit {

  // untuk button active
  isQuestionActive: Boolean;
  isParticipantActive: Boolean;

  // Untuk component show component question dan juga participant
  showQuestion: Boolean;
  showParticipant: Boolean;

  constructor() {

    // // untuk button active
    this.isQuestionActive = true
    this.isParticipantActive = false

    // Untuk component show component question dan juga participant
    this.showQuestion = true
    this.showParticipant = false
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
