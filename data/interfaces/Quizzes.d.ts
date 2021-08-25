export interface quizType {
  name: string;
  configurations: [
    {
      topics: string;
      numOfQuestion: number;
    }
  ];
  questions: [string];
  teacherId: number;
}

export interface quizzesType extends Array<quizType> {}
