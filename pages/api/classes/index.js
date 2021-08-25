import Class from "../../../data/models/Class";
import dbConnect from "../../../utils/dbConnect";

export default async function classes(req, res) {
  const {
    query: {},
    method,
  } = req;

  dbConnect();
  switch (method) {
    case "GET":
      try {
        const classDatas = await Class.find({}).exec();
        res.status(200).json({ success: true, data: classDatas });
      } catch (error) {
        console.error(`ERROR when get class datas`, error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      const name = req.body.name;
      try {
        await Class.create({
          name: name,
        });
        res.status(200).json({ success: true });
      } catch (error) {
        console.error(`ERROR in add class`, error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      break;
  }
}
