import { NextPage } from "next";
import { useEffect, useState } from "react";
import AllQuiz from "./Quizzes/AllQuiz";
import QuizQuestions from "./Quizzes/QuizQuestions";

interface questionsBanksItem {
  id: string;
  name: string;
  subject: string;
  totalQuestions: number;
}

interface questionsBanksType extends Array<questionsBanksItem> {}

const Quizzes: NextPage = () => {
  const [view, setView] = useState<string>("AllQuiz");
  const [quizId, setQuizId] = useState<number>(0);
  const [quizData, setQuizData] = useState({})

  const [rowPerPage, setRowPerPage] = useState<number>(8);
  const [pagination, setPagination] = useState<number>(0);
  const [totalPagination, setTotalPagination] = useState<number>(0);

  useEffect(() => {
    (async () => {
      switch (view) {
        case "AllQuiz":
          // fetch

          break;

        case "Quiz":
          // fetch
          break;

        default:
          break;
      }
    })();
  }, [view]);

  return (
    <>
      {view === "AllQuiz" ? (
        <AllQuiz setView={setView} setQuizId={setQuizId} setQuizData={setQuizData}/>
      ) : view === "Question" ? (
        <></>
      ) : view === "QuizQuestions" ? (
        <QuizQuestions quizId={quizId} quizData={quizData}/>
      ) : (
        <></>
      )}
    </>
  );
};

export default Quizzes;
