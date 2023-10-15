import { IUser } from "../interfaces/i-user";

export class UserModel implements IUser {
    id = 0
	username = ""
	email = ""
	password = ""
	name = ""
	token = ""
	active= false
	admin = false
}
