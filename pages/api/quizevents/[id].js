import dbConnect from "../../../utils/dbConnect";
import Quizevent from "../../../data/models/Quizevent";
import Quiz from "../../../data/models/Quiz";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();
  switch (method) {
    case "GET":
      const quiz = await Quiz.findById(id).exec();
      if (quiz.questions === null || quiz.questions === undefined) {
        return res.status(200).json({ success: false });
      }
      let questions = [];
      for (let topicId = 0; topicId < quiz.configuration.length; topicId++) {
        
      }

      break;

    case "POST":
      try {
        const verificationCode = req.body;

        const quizevent = await Quizevent.findById(id).exec();
        const quiz = await Quiz.aggregate([
          {
            $lookup: {
              from: "questionsbanks",
              localField: "questions",
              foreignField: "_id",
              as: "questionsData",
            },
          },
        ]);
        console.log(quiz);
        res.status(200).json({
          success: true,
          data: quiz,
        });
      } catch (error) {
        res.status(200).json({
          success: false,
        });
      }
      break;

    default:
      res.status(404).json({
        success: false,
      });
      break;
  }
}
