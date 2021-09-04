import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RemedialQuestionType } from "data/interfaces/Remedialquestion";
import React, { FC, useEffect, useState } from "react";
import RemedialQuestions from "./RemedialQuestions";
import StudentCard from "./StudentCard";

interface Props {
  remedialId: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

interface RemedialQuestionsType extends Array<RemedialQuestionType> {}

const initState = {} as RemedialQuestionType;

const RemedialDetail: FC<Props> = (props) => {
  const [view, setView] = useState("List");
  const [remedialquestions, setRemedialquestions] =
    useState<RemedialQuestionsType>([]);
  const [currentRemedialQuestion, setCurrentRemedialQuestion] =
    useState<RemedialQuestionType>(initState);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/remedialquestions/${props.remedialId}`, {
        method: "GET",
      });
      const resData = await res.json();
      if (resData.success) {
        console.log("", resData.data);
        setRemedialquestions(resData.data);
      }
    })();
  }, [props.remedialId]);

  return (
    <div className="flex flex-col">
      {view === "List" ? (
        <>
          <div className="p-2 flex items-center border-b-2 border-white">
            <span
              onClick={() => props.setView("List")}
              className="cursor-pointer hover:bg-gray-200 mr-2 rounded-full w-8 h-8  flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
            Lisf of Students
          </div>
          <div>
            {remedialquestions.map((remedialquestion, idx) => (
              <StudentCard
                key={idx}
                data={remedialquestion}
                setView={setView}
                setCurrentRemedialQuestion={setCurrentRemedialQuestion}
              />
            ))}
          </div>
        </>
      ) : (
        <RemedialQuestions data={currentRemedialQuestion} setView={setView} />
      )}
      <div></div>
    </div>
  );
};

export default RemedialDetail;
