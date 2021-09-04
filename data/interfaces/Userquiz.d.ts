export interface UserquizType {
  studentId: String;
  quizId: String;
  answers: String[];
  grade: Number;
  persona: {
    falseAnswerIdx: Number[];
  };
}
