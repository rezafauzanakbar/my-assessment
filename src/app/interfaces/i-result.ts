import { IAssessment } from "./i-assessment"
import { IUserAnswer } from "./i-user-answer"

export interface IResult {
    finalScore: Number // 1,1,1,0,0,1  (4/(assessment.questions.size))*100
	assessment: IAssessment // One to one
	answers: Array<IUserAnswer> // One to many
	createdAt: Date
}
