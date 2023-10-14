import { Component } from '@angular/core';
import { ChoiceModel } from 'src/app/models/choice-model';
import { QuestionModel } from 'src/app/models/question-model';

// Dummy data for the Choice model
const choice1 = new ChoiceModel();
choice1.id = 1;
choice1.value = "Choice A";
choice1.questionId = 1;
choice1.isTrue = true;

const choice2 = new ChoiceModel();
choice2.id = 2;
choice2.value = "Choice B";
choice2.questionId = 1;
choice2.isTrue = false;

const choice3 = new ChoiceModel();
choice3.id = 3;
choice3.value = "Choice C";
choice3.questionId = 1;
choice3.isTrue = false;

const choice4 = new ChoiceModel();
choice4.id = 4;
choice4.value = "Choice D";
choice4.questionId = 1;
choice4.isTrue = false;

// Dummy data for the Question model
const question1 = new QuestionModel();
question1.id = 1;
question1.text = "Apakah 1+1 = 2 ?";
question1.type = "choices";
question1.choices = [choice1, choice2, choice3, choice4];

console.log(question1);


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  // Mengambil data assessments
  questions : QuestionModel[] = [question1]  
}
