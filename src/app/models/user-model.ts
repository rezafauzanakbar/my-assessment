import { IAssessment } from "../interfaces/i-assessment";
import { IResult } from "../interfaces/i-result";
import { IUser } from "../interfaces/i-user";
import { AssessmentModel } from "./assessment-model";
import { ResultModel } from "./result-model";

export class UserModel implements IUser {
    id = 0
	nama = ""
	username = ""
	password = ""
	email = ""
}
