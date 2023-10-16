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

  constructor() { }

  ngOnInit(): void {
    console.log(this.questions);

  }

}
