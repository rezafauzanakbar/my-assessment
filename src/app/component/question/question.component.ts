import { Component, Input, OnInit } from '@angular/core';
import { IChoice } from 'src/app/interfaces/i-choice';
import { IQuestion } from 'src/app/interfaces/i-question';
import { ChoiceModel } from 'src/app/models/choice-model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  // menerima data question dari parent
  @Input() questions: IQuestion[] = []

  // memberikan tanda benar
  isBenar: Boolean
  choice: IChoice

  constructor() {
    this.isBenar = false
    this.choice = new ChoiceModel()
  }

  ngOnInit(): void {
    this.getStatus()
  }

  getStatus() {
    for (var i = 0; i < this.questions.length; i++) {
      for (var j = i; j < this.questions[i].choices.length; j++) {
        if (this.questions[i].choices[j].true == true) {
          this.isBenar = true
        } else if (this.questions[i].choices[j].true == false) {
          this.isBenar = false
        }
      }
    }
  }
}
