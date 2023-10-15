import { IQuestion } from "./i-question"
import { IResult } from "./i-result"
import { IUser } from "./i-user"

export interface IAssessment {
	id?: number
	title: String
	password: String
	endDate: Date
	participants?: Array<IUser> // many to many
	result?: Array<IResult>
	questions?: Array<IQuestion> // one to many



}
