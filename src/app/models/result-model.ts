import { IAssessment } from "../interfaces/i-assessment";
import { IResult } from "../interfaces/i-result";
import { IUserAnswer } from "../interfaces/i-user-answer";
import { AssessmentModel } from "./assessment-model";
import { UserAnswerModel } from "./user-answer-model";

export class ResultModel implements IResult {
    finalScore: Number = 0 // 1,1,1,0,0,1  (4/(assessment.questions.size))*100
	assessment: IAssessment = new AssessmentModel() // One to one
	answers: Array<IUserAnswer> = [new UserAnswerModel()] // One to many
	createdAt: Date = new Date()
}
