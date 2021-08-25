import dbConnect from "../../utils/dbConnect";
import Question from "../../data/models/Question";

export default async function topics(req, res) {
  const {
    query: {},
    method,
  } = req;

  try {
    dbConnect();
    const topics = await Question.distinct("topic");
    const topicsFormated = topics.map(topic => topic.toLowerCase());
    res.status(200).json({
      success: true,
      data: topicsFormated,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false });
  }
}
