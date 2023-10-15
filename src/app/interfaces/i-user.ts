import { IAssessment } from "./i-assessment"
import { IResult } from "./i-result"

export interface IUser {
	id?: Number
	username: String
	email: String
	password: String
	name: String
	token?: String
	results?: Array<IResult> // one to many
	assessments?: Array<IAssessment> // many to many
	active: Boolean,
	admin: Boolean
}
