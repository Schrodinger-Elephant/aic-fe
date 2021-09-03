import dbConnect from "../../../../utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();

  switch (method) {
    case "GET":
      try {
          
      } catch (error) {
        return res.status(200).json({ success: false });
      }

    default:
      break;
  }
}
