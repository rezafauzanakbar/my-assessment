import { IUserAnswer } from "../interfaces/i-user-answer";

export class UserAnswerModel implements IUserAnswer {
    id: Number = 0
	userId: Number = 0 // many to one
	resultId: Number = 0 // many to one
	value: String = ""
	score: Number = 0 // auto isi kalau choice atau manual kalau input, 0 - 1
}
