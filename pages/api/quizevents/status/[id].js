import dbConnect from "../../../../utils/dbConnect";
import Quizevent from "../../../../data/models/Quizevent";
import {
  NOT_STARTED,
  OVERDUE,
  STARTED,
} from "../../../../utils/const/quizevents/status";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();
  switch (method) {
    case "GET":
      try {
        if (id === null || id === undefined) {
          return res.status(200).json({
            success: false,
          });
        }
        const quizevent = await Quizevent.findById(id)
          .select({ _id: 0, quizId: 0 })
          .exec();

        if (quizevent === null || quizevent === undefined) {
          return res.status(404);
        }

        const quizeventObj = quizevent.toObject();
        quizeventObj.startTime = quizeventObj.startTime.toLocaleString();
        quizeventObj.endTime = quizeventObj.endTime.toLocaleString();
        const now = new Date().getTime();

        if (now > quizevent.endTime.getTime()) {
          return res.status(200).json({
            success: true,
            data: quizeventObj,
            status: OVERDUE,
          });
        } else if (now > quizevent.startTime.getTime()) {
          return res.status(200).json({
            success: true,
            data: quizeventObj,
            status: STARTED,
          });
        } else {
          return res.status(200).json({
            success: true,
            data: quizeventObj,
            status: NOT_STARTED,
          });
        }
      } catch (error) {
        console.error(`ERROR when get the quizevents data`, error);
        res.status(200).json({
          success: false,
        });
      }
      break;

    default:
      console.error(`ERROR when get the quizevents data`, error);
      res.status(200).json({
        success: false,
      });
      break;
  }
}
