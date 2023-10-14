import { IAssessment } from "./i-assessment"
import { IResult } from "./i-result"

export interface IUser {
	id?: Number
	nama: String
	username: String
	password: String
	email: String
	results?: Array<IResult> // one to many
	assessments?: Array<IAssessment> // many to many
}
