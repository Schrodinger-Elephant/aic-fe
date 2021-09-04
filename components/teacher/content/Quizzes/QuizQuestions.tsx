import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import React, { FC, useEffect, useState } from "react";
import { QuizQuestionType } from "data/interfaces/QuizQuestion";

interface Props {
  setView: React.Dispatch<React.SetStateAction<string>>;
  quizIdx: number;
  quizData: any;
}

const questionsInit = {
  topic: "",
  content: "",
  question: "",
  answer: "",
};

const QuizQuestions: FC<Props> = (props) => {
  const [questions, setQuestions] = useState<QuizQuestionType>([questionsInit]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `/api/quizzes/quizquestions/${props.quizData.quizquestionId}`,
        { method: "GET" }
      );
      const resData = await res.json();
      if (resData.success) {
        console.log(resData.data.questions);
        setQuestions(resData.data.questions);
      }
    })();
  }, []);

  const nextQuestion = () => {
    setCurrentIdx((currentIdx + questions.length + 1) % questions.length);
  };

  const prevQuestion = () => {
    setCurrentIdx((currentIdx + questions.length - 1) % questions.length);
  };

  const firstQuestion = () => {
    setCurrentIdx(0);
  };

  const lastQuestion = () => {
    setCurrentIdx(questions.length - 1);
  };

  return (
    <div className="bg-white bg-opacity-20 flex h-full pb-12 flex-col justify-between">
      <div className="flex flex-col flex-grow">
        <div className="flex items-center font-bold text-2xl p-2">
          <span
            onClick={() => props.setView("AllQuiz")}
            className="p-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-300 mr-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
          {props.quizData.name}
        </div>
        <div className="p-2 flex-grow">
          <div className="flex p-2 justify-center items-center">
            <span
              onClick={firstQuestion}
              className="mx-2 cursor-pointer border-2 border-white hover:bg-white hover:bg-opacity-50 rounded-full w-8 h-8 flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </span>
            <span
              onClick={prevQuestion}
              className="mx-2 cursor-pointer border-2 border-white hover:bg-white hover:bg-opacity-50 rounded-full w-8 h-8 flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
            <span
              onClick={nextQuestion}
              className="mx-2 cursor-pointer border-2 border-white hover:bg-white hover:bg-opacity-50 rounded-full w-8 h-8 flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
            <span
              onClick={lastQuestion}
              className="mx-2 cursor-pointer border-2 border-white hover:bg-white hover:bg-opacity-50 rounded-full w-8 h-8 flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </span>
          </div>

          {questions.length !== 0 ? (
            <>
              <h1 className="font-bold">
                Question {currentIdx + 1} of {questions.length}
              </h1>
              <h1 className="font-bold">Topic:</h1>
              <h1>{questions[currentIdx].topic}</h1>
              <h1 className="font-bold">Question:</h1>
              <h1>{questions[currentIdx].question}</h1>
              <h2 className="font-bold">Answer:</h2>
              <h2> {questions[currentIdx].answer}</h2>
              <h2 className="font-bold">Explanation:</h2>
              <h2>{questions[currentIdx].content}</h2>
              <h2 className="font-bold">Source:</h2>
              <h2>
                Ilmu Pengetahuan Alam / Kementerian Pendidikan dan Kebudayaan.--
                . Edisi Revisi Jakarta : Kementerian Pendidikan dan Kebudayaan,
                2018.
              </h2>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;
