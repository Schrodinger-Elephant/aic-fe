import Quiz from "../../../../data/models/Quiz";
import Quizquestion from "../../../../data/models/Quizquestion";
import Remedialquestion from "../../../../data/models/Remedialquestion";
import Userquiz from "../../../../data/models/Userquiz";
import dbConnect from "../../../../utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: { quizId },
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const quiz = await Quiz.findOne({ _id: quizId }).exec();
        if (quiz === undefined || quiz === null) {
          return res.status(200).json({ success: false });
        }

        const quizQuestion = await Quizquestion.findOne({
          _id: quiz.quizquestionId,
        }).exec();
        if (quizQuestion === undefined || quizQuestion === null) {
          return res.status(200).json({ success: false });
        }

        const userQuizzes = await Userquiz.find({ quizId: quizId }).exec();

        for (
          let userQuizIdx = 0;
          userQuizIdx < userQuizzes.length;
          userQuizIdx++
        ) {
          let questions = [];

          // console.log(quizQuestion)
          const wrongAnswersIdx =
            userQuizzes[userQuizIdx].persona.falseAnswerIdx;

          for (let waIdx = 0; waIdx < wrongAnswersIdx.length; waIdx++) {
            const newQues = await fetch(`http://34.74.188.92:5000/praseindo`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: quizQuestion.questions[waIdx].question,
              }),
            });
            const newQuesData = await newQues.json();
            const newAns = await fetch(`http://34.74.188.92:5000/praseindo`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: quizQuestion.questions[waIdx].answer,
              }),
            });
            const newAnsData = await newAns.json();

            const randomQuesIdx = Math.floor(Math.random() * 3);
            const randomAnsIdx = Math.floor(Math.random() * 3);

            const newQuestion = {
              topic: quizQuestion.questions[waIdx].topic,
              content: quizQuestion.questions[waIdx].content,
              question: newQuesData["possible_text"][randomQuesIdx],
              answer: newAnsData["possible_text"][randomAnsIdx],
            };

            questions.push(newQuestion);
            // console.log("wrong answer", quizQuestion.questions[waIdx]);
          }

          const newRemedialQuestion = {
            remedialId: quiz.remedialId,
            userId: userQuizzes[userQuizIdx].studentId,
            questions: questions,
          };

          const remedialQuestion = await Remedialquestion.create(
            newRemedialQuestion
          );
          console.log("in generator: newRemedialQuestion", newRemedialQuestion);
        }
        return res.status(200).json({ success: true });
      } catch (error) {
        console.error(`ERROR`, error);
        return res.status(200).json({ success: false });
      }

    default:
      res.status(200).json({ success: false });
  }
}
