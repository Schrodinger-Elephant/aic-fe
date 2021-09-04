import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RemedialQuestionType } from "data/interfaces/Remedialquestion";
import React, { FC, useEffect, useState } from "react";

interface Props {
  data: RemedialQuestionType;
  setView: React.Dispatch<React.SetStateAction<string>>;
  setCurrentRemedialQuestion: React.Dispatch<
    React.SetStateAction<RemedialQuestionType>
  >;
}

const StudentCard: FC<Props> = (props) => {
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/users/${props.data.userId}`, {
        method: "GET",
      });
      const resData = await res.json();

      if (resData.success) {
        console.log(resData.data);
        setUserData(resData.data);
      }
    })();
  }, [props.data.userId]);

  return (
    <div className="flex items-center justify-between p-2 border-b-2 border-white border-opacity-50">
      <h1>{userData?.username}</h1>
      <button
        onClick={() => {
          props.setCurrentRemedialQuestion(props.data);
          props.setView("Details");
        }}
        className="p-2 bg-gradient-to-r rounded-xl from-pink-500 via-red-600 to-purple-500"
      >
        <span className="mr-2">
          <FontAwesomeIcon icon={faQuestion} />
        </span>
        See Question
      </button>
    </div>
  );
};

export default StudentCard;
