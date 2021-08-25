import dbConnect from "../../utils/dbConnect";
import Question from "../../data/models/Question";

export default async function hello(req, res) {
  const {
    query: { id },
    method,
  } = req;

  dbConnect();
  const questions = await Question.find({}).exec()
  console.log(questions)
  res.status(200).json(questions)
  
}
