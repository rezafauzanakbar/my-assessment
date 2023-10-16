import { IUserAnswer } from "./i-user-answer"

export interface Iresultall {
    id?: Number
    finalScore: Number // 1,1,1,0,0,1  (4/(assessment.questions.size))*100
    createdAt: Date
    answers: Array<IUserAnswer> // One to many
}
