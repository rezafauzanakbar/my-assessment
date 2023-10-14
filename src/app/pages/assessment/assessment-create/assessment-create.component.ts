import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user';
import { AssessmentModel } from 'src/app/models/assessment-model';
import { ChoiceModel } from 'src/app/models/choice-model';
import { QuestionModel } from 'src/app/models/question-model';
import { ResultModel } from 'src/app/models/result-model';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-assessment-create',
  templateUrl: './assessment-create.component.html',
  styleUrls: ['./assessment-create.component.css']
})
export class AssessmentCreateComponent implements OnInit {

  public isCollapsed = false;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  assessment: AssessmentModel = {
    id: 0,
    title: '',
    questions: [],
    password: '',
    participants: [],
    endDate: new Date()
  };

  question: QuestionModel = {
    id: 0,
    text: '',
    image: '',
    type: 'choices',
    choices: []
  };

  user: IUser = {
    id: 0,
    nama: '',
    username: '',
    password: '',
    email: ''
  };

  choice: ChoiceModel = {
    id: 0,
    value: '',
    questionId: 0,
    isTrue: false
  };

  addQuestion() {
    this.assessment.questions.push(this.question);
    this.question = {
      id: 0,
      text: '',
      image: '',
      type: 'choices',
      choices: []
    };
  }

  addParticipant() {
    this.assessment.participants.push(this.user);
    this.user = {
      id: 0,
      nama: '',
      username: '',
      password: '',
      email: ''
    };
  }

  addChoice(question: Number) {
    this.question.choices?.push(this.choice)
    this.choice = {
      id: 0,
      value: '',
      questionId: question,
      isTrue: false
    };
  }

  submitAssessment() {
    // Implement logic to submit the assessment to your backend
    console.log(this.assessment);
  }
}
