import { IAssessment } from "../interfaces/i-assessment";
import { IQuestion } from "../interfaces/i-question";
import { IUser } from "../interfaces/i-user";
import { QuestionModel } from "./question-model";
import { UserModel } from "./user-model";

export class AssessmentModel implements IAssessment {
    id: Number = 0
	title: String = ""
	questions: Array<IQuestion> = [new QuestionModel()] // one to many
	password: String = ""
	participants: Array<IUser> = [new UserModel()] // many to many
	endDate: Date = new Date()
}
