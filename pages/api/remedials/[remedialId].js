import Remedial from "../../../data/models/Remedial";
import dbConnect from "../../../utils/dbConnect";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const {
    query: { remedialId },
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
        if (!mongoose.Types.ObjectId.isValid(remedialId)) {
          console.error(
            "ERROR when get remedial by Id, the id: ", remedialId, " is not valid"
          );
          return res.status(200).json({ success: false });
        }
        const remedial = await Remedial.findOne({ _id: remedialId }).exec();
        console.log(remedial);
        if (remedial === null || remedial === undefined) {
          return res.status(200).json({ success: false });
        }
        return res.status(200).json({ success: true, data: remedial });
      } catch (error) {
        console.error(`ERROR when get remedial by Id`, error);
        return res.status(200).json({ success: false });
      }

    default:
      break;
  }
}
