import Quizquestion from "../../../../data/models/Quizquestion";
import dbConnect from "../../../../utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      const quizQuestion = await Quizquestion.findById(id).exec();
      if (quizQuestion === null || quizQuestion === undefined) {
        return res.status(200).json({ success: false });
      }
      console.log(quizQuestion)
      return res.status(200).json({ success: true, data: quizQuestion });

    default:
      break;
  }
}
