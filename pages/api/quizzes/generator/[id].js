import Quiz from "../../../../data/models/Quiz";
import Question from "../../../../data/models/Question";
import dbConnect from "../../../../utils/dbConnect";
import Quizquestion from "../../../../data/models/Quizquestion";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const quiz = await Quiz.findById(id).exec();
      // console.log("HERE", quiz.questions)
      // if (quiz.questions.length !== 0) {
      //   return res.status(200).json({ success: false });
      // }
      let questions = [];
      for (let topicId = 0; topicId < quiz.configurations.length; topicId++) {
        const randomQues = await Question.aggregate([
          {
            $match: {
              topic: quiz.configurations[topicId].topic,
            },
          },
          { $sample: { size: quiz.configurations[topicId].numOfQuestion } },
        ]);
        randomQues.forEach((elem) => questions.push(elem));
      }
      for (let iter = 0; iter < questions.length; iter++) {
        const fromAI = await fetch("http://34.74.188.92:5000/genpreindo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ context: questions[iter].content }),
        });
        const fromAIdata = await fromAI.json();
        delete questions[iter]._id;
        questions[iter].question = fromAIdata.question;
        questions[iter].answer = fromAIdata.answer;
      }
      const newQuizquestion = await Quizquestion.create({
        questions: questions,
      });
      const updatedQuiz = await Quiz.findOneAndUpdate(
        { _id: id },
        { $set: { quizquestionId: String(newQuizquestion._id) } },
        { new: true }
      ).exec();
      return res.status(200).json({ success: true });

    default:
      break;
  }
}
