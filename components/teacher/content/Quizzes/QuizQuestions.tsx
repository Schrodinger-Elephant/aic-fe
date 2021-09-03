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
  quizId: number;
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
        `http://34.125.39.153:3000/api/quizzes/quizquestions/${props.quizData.quizquestionId}`,
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
          {questions.length !== 0 ? (
            <>
              <h1 className="font-bold text-xl">Question {currentIdx + 1} :</h1>
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
        <div className="bg-white bg-opacity-50 flex p-2 justify-center">
          <span
            onClick={firstQuestion}
            className="flex items-center justify-center cursor-pointer hover:bg-gray-300 h-8 w-8 p-2 rounded-full"
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </span>
          <span
            onClick={prevQuestion}
            className="flex items-center justify-center cursor-pointer hover:bg-gray-300 h-8 w-8 p-2 rounded-full"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
          <span
            onClick={nextQuestion}
            className="flex items-center justify-center cursor-pointer hover:bg-gray-300 h-8 w-8 p-2 rounded-full"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
          <span
            onClick={lastQuestion}
            className="flex items-center justify-center cursor-pointer hover:bg-gray-300 h-8 w-8 p-2 rounded-full"
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;
