import { IChoice } from "./i-choice"

export interface IQuestion {
    id?: Number
	text: String
	image?: String
	type: String //'choices | input' //input optional
	choices?: Array<IChoice> // one to many
}
