export interface RemedialQuestionType {
  remedialId: String;
  userId: String;
  questions: [
    {
      topic: String;
      content: String;
      question: String;
      answer: String;
    }
  ];
}
