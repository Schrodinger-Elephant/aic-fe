import User from "../../../data/models/User";
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
        const user = await User.findOne({ _id: id }).exec();
        if (user === null || user === undefined) {
          return res.status(200).json({ success: false });
        }
        return res.status(200).json({ success: true, data: user });
      } catch (error) {
        console.error(`ERROR when get user by Id. id:${id}`);
        return res.status(200).json({ success: false });
      }

    default:
      return res.status(200).json({ success: false });
  }
}
