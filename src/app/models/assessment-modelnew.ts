export interface Choice {
  isTrue: boolean;
  value: string;
}

export interface Question {
  text: string;
  choices: Choice[];
}

export interface Assessment {
  title: string;
  endDate: string;
  questions: Question[];
}
