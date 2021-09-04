import {
  faBrain,
  faCheck,
  faCircleNotch,
  faHourglassHalf,
  faPoll,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";

interface Props {
  quizIdx: number;
  quizData: any;
  updateQuizzesId: (newId: string, quizIdx: number) => void;
  setView: React.Dispatch<React.SetStateAction<string>>;
  setQuizIdx: React.Dispatch<React.SetStateAction<number>>;
  setQuizData: React.Dispatch<React.SetStateAction<any>>;
}

const AQuiz: FC<Props> = (props) => {
  let initState = "";

  if (props.quizData.quizquestionId === undefined) {
    initState = "faBrain";
  } else {
    initState = "faCheck";
  }

  const [viewState, setViewState] = useState(initState);

  const generateQuestions = async () => {
    setViewState("faCircleNotch");
    const res = await fetch(`/api/quizzes/generator/${props.quizData._id}`, {
      method: "GET",
    });
    const resData = await res.json();
    if (resData.success) {
      props.updateQuizzesId(resData.data.quizquestionId, props.quizIdx);
      setViewState("faCheck");
    }
  };

  return (
    <div className="flex items-center">
      {viewState === "faCircleNotch" ? (
        <span className="h-8 w-8 flex justify-center items-center">
          <FontAwesomeIcon icon={faCircleNotch} spin />
        </span>
      ) : viewState === "faBrain" ? (
        <span
          onClick={() => {
            generateQuestions();
          }}
          className="cursor-pointer h-8 w-8 rounded-full flex justify-center items-center hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={faBrain} />
        </span>
      ) : viewState === "faCheck" ? (
        <span className="h-8 w-8 rounded-full flex justify-center items-center text-green-500">
          <FontAwesomeIcon icon={faCheck} />
        </span>
      ) : (
        <></>
      )}
      {new Date() > new Date(props.quizData.startTime) ? (
        <button
          onClick={() => {
            props.setQuizIdx(props.quizIdx);
            props.setQuizData(props.quizData);
            props.setView("QuizResults");
          }}
          className="flex justify-center items-center bg-green-600 hover:bg-green-500 p-2 px-3 rounded-xl"
        >
          <span className="flex justify-center items-center mr-2">
            <FontAwesomeIcon icon={faPoll} />
          </span>
          Result
        </button>
      ) : (
        <button
          onClick={() => props.setView("QuizResults")}
          className="flex justify-center items-center bg-yellow-600 hover:bg-yellow-500 p-2 px-3 rounded-xl"
        >
          <span className="flex justify-center items-center mr-2">
            <FontAwesomeIcon icon={faHourglassHalf} />
          </span>
          Not Started
        </button>
      )}
    </div>
  );
};

export default AQuiz;
