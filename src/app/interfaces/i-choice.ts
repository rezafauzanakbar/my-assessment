export interface IChoice {
    id?: Number
	value: String
	questionId: Number // many to one
	isTrue: Boolean
}
