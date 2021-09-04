import Userquiz from "../../../data/models/Userquiz";
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
        const userQuizzes = await Userquiz.aggregate([
          {
            $match: {
              quizId: quizId,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "studentId",
              foreignField: "_id",
              as: "studentName",
            },
          },
        ]);
        if (userQuizzes.length === 0) {
          return res.status(200).json({ success: false });
        }
        return res.status(200).json({ success: true, data: userQuizzes });
      } catch (error) {
        return res.status(200).json({ success: false });
      }

    default:
      break;
  }
}
