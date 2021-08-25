import {
  faBrain,
  faCheck,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AQuiz = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateQuestions = async () => {
    setIsLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/quizzes/generator/${props.quiz._id}`,
      { method: "GET" }
    );
    const resData = await res.json();
    if (resData.success) {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      {isLoading ? (
        <span className="h-8 w-8 flex justify-center items-center">
          <FontAwesomeIcon icon={faCircleNotch} spin />
        </span>
      ) : (
        <>
          {props.quiz.quizquestionId === "" ? (
            <span
              onClick={() => {
                generateQuestions();
              }}
              className="cursor-pointer h-8 w-8 rounded-full flex justify-center items-center hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={faBrain} />
            </span>
          ) : (
            <span className="h-8 w-8 rounded-full flex justify-center items-center text-green-500">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default AQuiz;
