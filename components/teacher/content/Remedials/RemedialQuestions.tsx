import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RemedialQuestionType } from "data/interfaces/Remedialquestion";
import React, { FC, useEffect, useState } from "react";

interface Props {
  data: RemedialQuestionType;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const RemedialQuestions: FC<Props> = (props) => {
  const [currentQuesIdx, setCurrentQuesIdx] = useState<number>(0);
  const [currentQues, setCurrentQues] = useState<any>(
    props.data.questions[currentQuesIdx]
  );
  const numOfQues = props.data.questions.length;

  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    (async () => {
      console.log("remques", props.data);
      const user = await fetch(`/api/users/${props.data.userId}`, {
        method: "GET",
      });
      const userData = await user.json();
      if (userData.success) {
        setUserData(userData.data);
      }
    })();
  }, [props.data.userId]);
  return (
    <div className="flex flex-col">
      <div className="flex font-bold items-center p-2 border-b-2 border-white border-opacity-50">
        <span
          onClick={() => props.setView("List")}
          className="flex items-center justify-center w-8 h-8 mr-2 rounded-full hover:bg-white hover:bg-opacity-50"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </span>
        {userData.username}
      </div>
      <div className="p-4 flex flex-col">
        <div className="flex items-center justify-center">
          <span
            onClick={() => {
              setCurrentQuesIdx(0);
              setCurrentQues(props.data.questions[0]);
            }}
            className="mx-2 cursor-pointer border-2 border-white hover:bg-white hover:bg-opacity-50 rounded-full w-8 h-8 flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </span>
          <span
            onClick={() => {
              setCurrentQuesIdx((currentQuesIdx - 1) % numOfQues);
              setCurrentQues(
                props.data.questions[
                  (currentQuesIdx - 1 + numOfQues) % numOfQues
                ]
              );
            }}
            className="mx-2 cursor-pointer border-2 border-white hover:bg-white hover:bg-opacity-50 rounded-full w-8 h-8 flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
          <span
            onClick={() => {
              setCurrentQuesIdx((currentQuesIdx + 1) % numOfQues);
              setCurrentQues(
                props.data.questions[(currentQuesIdx + 1) % numOfQues]
              );
            }}
            className="mx-2 cursor-pointer border-2 border-white hover:bg-white hover:bg-opacity-50 rounded-full w-8 h-8 flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
          <span
            onClick={() => {
              setCurrentQuesIdx(numOfQues - 1);
              setCurrentQues(props.data.questions[numOfQues - 1]);
            }}
            className="mx-2 cursor-pointer border-2 border-white hover:bg-white hover:bg-opacity-50 rounded-full w-8 h-8 flex justify-center items-center"
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </span>
        </div>
        <div className="font-bold">
          Question {currentQuesIdx + 1} of {numOfQues}:
        </div>
        <div>
          <h1 className="font-bold">Topic:</h1>
          {currentQues.topic}
        </div>
        <div>
          <h1 className="font-bold">Question:</h1>
          {currentQues.question}
        </div>
        <div>
          <h1 className="font-bold">Answer:</h1>
          {currentQues.answer}
        </div>
        <div>
          <h1 className="font-bold">Explanation:</h1>
          {currentQues.content}
        </div>
      </div>
    </div>
  );
};

export default RemedialQuestions;
