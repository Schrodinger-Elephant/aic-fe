import Userquiz from "../../../data/models/Userquiz";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: {},
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const userQuizzes = await Userquiz.find({}).exec();
        if (userQuizzes.length === 0) {
          return res.status(200).json({ success: false });
        }
        return res.status(200).json({ success: true, data: userQuizzes });
      } catch (error) {
        console.error(`ERROR when get the userquizzes`, error);

        return res.status(200).json({ success: false });
      }

    case "POST":
      // Userquiz.create({
      //   studentId: "6131d092570d1c213b970c27",
      //   quizId: "61318eee8760995946e6783e",
      //   answers: [],
      //   grade: 53,
      //   persona: { falseAnswerIdx: [1, 5, 6, 7, 10, 12, 14] },
      // });
      return res.status(200).json({ success: false });

    default:
      break;
  }
}
