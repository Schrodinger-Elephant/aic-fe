import dbConnect from "../../../utils/dbConnect";
import Remedial from "../../../data/models/Remedial";

export default async function handler(req, res) {
  const {
    query: {},
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        const remedials = await Remedial.find({}).exec();
        if (remedials.length === 0) {
          return res.status(200).json({ success: false });
        }
        return res.status(200).json({ success: true, data: remedials });
      } catch (error) {
        console.error(`ERROR when get the remedials`, error);
        return res.status(200).json({ success: false });
      }

    case "POST":
      return res.status(200).json({ success: false });
      
    default:
      return res.status(200).json({ success: false });
  }
}
