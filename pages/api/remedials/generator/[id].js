import dbConnect from "../../../../utils/dbConnect";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();
  
  switch (method) {
    case "GET":
      break;

    default:
      break;
  }
}
