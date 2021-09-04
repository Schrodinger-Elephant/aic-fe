import Remedialquestion from "../../../data/models/Remedialquestion";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const remedialQuestions = await Remedialquestion.find({
          remedialId: id,
        }).exec();
        return res.status(200).json({ success: true, data: remedialQuestions });
      } catch (error) {
        console.error(`ERROR when get remedialquestions with id:${id}`);
        return res.status(200).json({ success: false });
      }

    default:
      return res.status(200).json({ success: false });
  }
}
