import { IAssessment } from "../interfaces/i-assessment";
import { IResult } from "../interfaces/i-result";
import { IUser } from "../interfaces/i-user";
import { IUserAnswer } from "../interfaces/i-user-answer";
import { AssessmentModel } from "./assessment-model";
import { UserAnswerModel } from "./user-answer-model";
import { UserModel } from "./user-model";

export class ResultModel implements IResult {
	id: Number = 0
	finalScore: Number = 0 // 1,1,1,0,0,1  (4/(assessment.questions.size))*100
	createdAt: Date = new Date()
	user: IUser = new UserModel()
	answers: Array<IUserAnswer> = [new UserAnswerModel()] // One to many
}
