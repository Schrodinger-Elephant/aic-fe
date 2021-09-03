import { NextPage } from "next";
import { useEffect, useState } from "react";
import AddQuiz from "./Quizzes/AddQuiz";
import AllQuiz from "./Quizzes/AllQuiz";
import QuizQuestions from "./Quizzes/QuizQuestions";
import QuizResult from "./Quizzes/QuizResult";

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
  const [quizData, setQuizData] = useState({});

  const [datas, setDatas] = useState([]);
  const [dataId, setDataId] = useState(0);

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
        <AllQuiz
          setView={setView}
          setQuizId={setQuizId}
          setQuizData={setQuizData}
        />
      ) : view === "Question" ? (
        <></>
      ) : view === "QuizQuestions" ? (
        <QuizQuestions setView={setView} quizId={quizId} quizData={quizData} />
      ) : view === "QuizResults" ? (
        <QuizResult setView={setView} />
      ) : view === "AddQuiz" ? (
        <AddQuiz setView={setView} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Quizzes;
