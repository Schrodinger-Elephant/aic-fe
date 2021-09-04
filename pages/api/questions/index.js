import dbConnect from "../../../utils/dbConnect";
import Question from "../../../data/models/Question";

export default async function handler(req, res) {
  const {
    query: {},
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "POST":
      try {
        const question = await Question.create({
          ...req.body,
          source:
            "Ilmu Pengetahuan Alam / Kementerian Pendidikan dan Kebudayaan.-- . Edisi Revisi Jakarta : Kementerian Pendidikan dan Kebudayaan, 2018.",
        });
        if (question === undefined || question === null) {
          return res.status(200).json({ success: false });
        }
        return res.status(200).json({ success: true });
      } catch (error) {
        console.error(`ERROR when creating question`, error);
        return res.status(200).json({ success: false });
      }

    default:
      return res.status(200).json({ success: false });
  }
}
