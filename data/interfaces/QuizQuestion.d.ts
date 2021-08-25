export interface QuestionType {
  topic: string;
  content: string;
  question: string;
  answer: string;
}

export interface QuizQuestionType extends Array<QuestionType> {}
