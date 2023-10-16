import { IChoice } from "../interfaces/i-choice";
import { IQuestion } from "../interfaces/i-question";
import { IUserAnswer } from "../interfaces/i-user-answer";
import { ChoiceModel } from "./choice-model";
import { QuestionModel } from "./question-model";

export class UserAnswerModel implements IUserAnswer {
	id: Number = 0
	text: String = ""
	choice: Array<IChoice> = [new ChoiceModel()]
	question: Array<IQuestion> = [new QuestionModel()]
	score: Number = 0 // auto isi kalau choice atau manual kalau input, 0 - 1
}
