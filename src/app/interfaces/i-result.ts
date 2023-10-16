import { IAssessment } from "./i-assessment"
import { IUser } from "./i-user"
import { IUserAnswer } from "./i-user-answer"

export interface IResult {
	id?: Number
	finalScore: Number // 1,1,1,0,0,1  (4/(assessment.questions.size))*100
	createdAt: Date
	user: IUser
	answers: Array<IUserAnswer> // One to many
}
