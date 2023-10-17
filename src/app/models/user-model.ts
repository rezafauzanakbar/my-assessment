import { IResult } from "../interfaces/i-result";
import { IUser } from "../interfaces/i-user";
import { ResultModel } from "./result-model";

export class UserModel implements IUser {
	id = 0
	username = ""
	email = ""
	password = ""
	name = ""
	token = ""
	active = false
	admin = false
}
