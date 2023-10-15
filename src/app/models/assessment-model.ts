import { IAssessment } from "../interfaces/i-assessment";
import { IQuestion } from "../interfaces/i-question";
import { IResult } from "../interfaces/i-result";
import { IUser } from "../interfaces/i-user";
import { QuestionModel } from "./question-model";
import { ResultModel } from "./result-model";
import { UserModel } from "./user-model";

export class AssessmentModel implements IAssessment {
	id?: number | undefined
	title: String = ""
	password: String = ""
	endDate: Date = new Date()
	participants?: Array<IUser> = [new UserModel] // many to many
	result?: Array<IResult> = [new ResultModel]
	questions?: Array<IQuestion> = [new QuestionModel] // one to many



}
