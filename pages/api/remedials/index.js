import dbConnect from "../../../utils/dbConnect";
import Remedial from "../../../data/models/Remedial";
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
        const remedials = await Remedial.aggregate([
          { $project: { remedialId: { $toString: "$_id" } } },
          {
            $lookup: {
              from: "quizzes",
              localField: "remedialId",
              foreignField: "remedialId",
              as: "quiz",
            },
          },
        ]);
        if (remedials.length === 0) {
          return res.status(200).json({ success: false });
        }
        return res.status(200).json({ success: true, data: remedials });
      } catch (error) {
        console.error(`ERROR when get the remedials`, error);
        return res.status(200).json({ success: false });
      }

    case "POST":
      try {
        const quizId = req.body.quizId;
        const remedial = await Remedial.create({});
        const updatedQuiz = await Quiz.findOneAndUpdate(
          { _id: quizId },
          { $set: { remedialId: String(remedial._id) } },
          { new: true }
        ).exec();
        return res.status(200).json({ success: true, data: updatedQuiz });
      } catch (error) {
        console.error(`ERROR when creating remedial`, error);
        return res.status(200).json({ success: false });
      }

    default:
      return res.status(200).json({ success: false });
  }
}
