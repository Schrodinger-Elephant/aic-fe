import dbConnect from "../../../utils/dbConnect";
import Quiz from "../../../data/models/Quiz";

export default async function handler(req, res) {
  const {
    query: {},
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const quizzes = await Quiz.find({}).exec();
        if (quizzes.length === 0) {
          return res.status(200).json({ success: false });
        }
        return res.status(200).json({ success: true, data: quizzes });
      } catch (error) {
        console.error(`ERROR when get the quizzes`, error);
        return res.status(200).json({ success: false });
      }
    case "POST":
      try {
        let startTime = new Date(
          req.body.startTime.split("T")[0] + " " + req.body.time
        );
        let newQuiz = {
          name: req.body.name,
          startTime: startTime,
          endTime: new Date(startTime.getTime() + req.body.duration * 60000),
          configurations: [],
          passKey: req.body.passKey,
        };
        for (
          let iteration = 0;
          iteration < req.body.topics.length;
          iteration++
        ) {
          newQuiz.configurations.push({
            topic: req.body.topics[iteration],
            numOfQuestion: Number(req.body.topicsQues[iteration]),
          });
        }
        const quiz = await Quiz.create(newQuiz);
        if (quiz === undefined || quiz === null) {
          res.status(404);
        }
        return res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        return res.status(404);
      }

      break;

    default:
      break;
  }
}
