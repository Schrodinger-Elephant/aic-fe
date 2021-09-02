import {
  faBrain,
  faCheck,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AQuiz = (props: any) => {
  let initState = "";

  if (props.quiz.quizquestionId === undefined) {
    initState = "faBrain";
  } else {
    initState = "faCheck";
  }

  const [viewState, setViewState] = useState(initState);

  const generateQuestions = async () => {
    setViewState("faCircleNotch");
    const res = await fetch(
      `http://localhost:3000/api/quizzes/generator/${props.quiz._id}`,
      { method: "GET" }
    );
    const resData = await res.json();
    if (resData.success) {
      props.updateQuizzesId(resData.data.quizquestionId, props.quizId);
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
    </div>
  );
};

export default AQuiz;
