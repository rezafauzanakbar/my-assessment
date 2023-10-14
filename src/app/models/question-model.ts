import { IChoice } from "../interfaces/i-choice";
import { IQuestion } from "../interfaces/i-question";
import { ChoiceModel } from "./choice-model";

export class QuestionModel implements IQuestion {
    id: Number = 0
	text: String = ""
	image?: String = ""
	type: String = "" //'choices | input' //input optional
	choices?: Array<IChoice> = [new ChoiceModel()] // one to many
}
