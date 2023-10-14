export interface IUserAnswer {
    id?: Number
	userId: Number // many to one
	resultId: Number // many to one
	value: String
	score: Number // auto isi kalau choice atau manual kalau input, 0 - 1
}
