import { IChoice } from "../interfaces/i-choice";

export class ChoiceModel implements IChoice {
    id: Number = 0
	value: String = ""
	questionId: Number = 0 // many to one
	isTrue: Boolean = false
}
