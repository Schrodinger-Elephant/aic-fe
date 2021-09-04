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
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [quizData, setQuizData] = useState<any>();

  const [datas, setDatas] = useState([]);
  const [dataId, setDataId] = useState(0);

  const [rowPerPage, setRowPerPage] = useState<number>(8);
  const [pagination, setPagination] = useState<number>(0);
  const [totalPagination, setTotalPagination] = useState<number>(0);

  useEffect(() => {
    console.log('quizIdx', quizIdx)
    console.log('quizData', quizData)
    
  }, [])

  return (
    <>
      {view === "AllQuiz" ? (
        <AllQuiz
          setView={setView}
          setQuizIdx={setQuizIdx}
          setQuizData={setQuizData}
        />
      ) : view === "Question" ? (
        <></>
      ) : view === "QuizQuestions" ? (
        <QuizQuestions quizIdx={quizIdx} quizData={quizData} setView={setView} />
      ) : view === "QuizResults" ? (
        <QuizResult quizId={quizData._id} quizName={quizData.name} setView={setView} />
      ) : view === "AddQuiz" ? (
        <AddQuiz setView={setView} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Quizzes;
