import Quiz from "../../../data/models/Quiz";
import dbConnect from "../../../utils/dbConnect";

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
        return res.status(200).json({ success: true, data: quiz });
      } catch (error) {
        console.error(`ERROR when get quiz with id:${quizId}`);
        return res.status(200).json({ success: false });
      }

    default:
      return res.status(200).json({ success: false });
  }
}
