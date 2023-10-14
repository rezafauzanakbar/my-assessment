import { IQuestion } from "./i-question"
import { IUser } from "./i-user"

export interface IAssessment {
    id?: Number
	title: String
	questions?: Array<IQuestion> // one to many
	password: String
	participants?: Array<IUser> // many to many
	endDate: Date
}
