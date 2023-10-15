export interface Choice {
  true: boolean;
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
