import { IChoice } from "./i-choice"
import { IQuestion } from "./i-question"

export interface IUserAnswer {
	id?: Number
	text: String
	choice: Array<IChoice>
	question: Array<IQuestion>
	score: Number // auto isi kalau choice atau manual kalau input, 0 - 1
}
