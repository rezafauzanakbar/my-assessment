type User = {
	id: number
	nama: String
	email: String
	password: String
	isAdmin: 'admin' | 'user'
	username: String
	results: Result[] // one to many
	assessments: assessment[] // many to many
}

type UserAnswer = {
	id: number
	userId: number // many to one
	resultId: number // many to one
	value: String
	score: number // auto isi kalau choice atau manual kalau input, 0 - 1
}

type choice = {
	id: number
	value: string
	questionId: number // many to one
	isTrue: Boolean
}

type question = {
	id: number
	text: string
	image?: string
	type: 'choices | input' //input optional
	choices?: choice[] // one to many
}

type assessment = {
	id: number
	title: string
	questions: question[] // one to many
	password: String
	participants: User[] // many to many
	closeDate: Date
}

type Result = {
	finalScore: number // 1,1,1,0,0,1  (4/(assessment.questions.size))*100
	assessment: assessment // One to one
	answers: UserAnswer[] // One to many
	createdAt: Date
}
