import {
  faAngleLeft,
  faBrain,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserquizType } from "data/interfaces/Userquiz";
import { FC, useEffect, useState } from "react";
import GeneratingModal from "./GeneratingModal";
import Result from "./Result";

interface Props {
  quizId: string;
  quizName: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const QuizResult: FC<Props> = (props) => {
  const [results, setResults] = useState<[UserquizType]>();
  const [remedialId, setRemedialId] = useState<string>("");

  const [status, setStatus] = useState("LOADING");

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `/api/userquizzes/quizId?quizId=${props.quizId}`,
        {
          method: "GET",
        }
      );
      const resData = await res.json();
      if (resData.success) {
        console.log(resData.data);
        setResults(resData.data);
      }
      const resQuiz = await fetch(`/api/quizzes/${props.quizId}`, {
        method: "GET",
      });
      const resQuizData = await resQuiz.json();
      if (resQuizData.success) {
        if (resQuizData.data.remedialId) {
          setRemedialId(resQuizData.data.remedialId);
          setStatus("CREATED");
        } else {
          setStatus("NOT CREATED");
        }
      } else {
        setStatus("NOT CREATED");
      }
    })();
  }, [props.quizId]);

  const createRemedial = async () => {
    setStatus("LOADING");
    const res = await fetch(`/api/remedials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quizId: props.quizId }),
    });
    const resData = await res.json();
    if (resData.success) {
      setRemedialId(resData.data.remedialId);
      generateRemedialQuestion()
    } else {
      setStatus("NOT CREATED");
    }
  };

  const generateRemedialQuestion = async () => {
    const res = await fetch(
      `/api/remedialquestions/generator?quizId=${props.quizId}`,
      {
        method: "GET",
      }
    );

    const resData = await res.json();
    if (resData.success) {
      setStatus("CREATED")
    }
  };

  return (
    <>
    {status === "LOADING" ? <GeneratingModal/>:<></>}
    <div className="text-white">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center">
          <span
            onClick={() => props.setView("AllQuiz")}
            className="cursor-pointer h-8 w-8 rounded-full flex justify-center items-center hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
          Result of {props.quizName}
        </div>
        {status === "LOADING" ? (
          <button className="p-2 bg-gradient-to-r from-purple-400 via-pink-500 hover:bg-blue-900 rounded-xl">
            <span className="mr-2">
              <FontAwesomeIcon icon={faCircleNotch} spin />
            </span>
            LOADING...
          </button>
        ) : status === "NOT CREATED" ? (
          <button
            onClick={() => {
              createRemedial()
              // generateRemedialQuestion();
            }}
            className="p-2 bg-gradient-to-r from-purple-400 via-pink-500 hover:bg-blue-900 rounded-xl"
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faBrain} />
            </span>
            Create Remedial!
          </button>
        ) : status === "CREATED" ? (
          <button className="p-2 bg-gradient-to-r from-purple-400 via-pink-500 hover:bg-blue-900 rounded-xl">
            <span className="mr-2">
              <FontAwesomeIcon icon={faBrain} />
            </span>
            Generate Remedial Question !
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="p-2">Total Students: 5 Some Chart??</div>
      <div className="p-2">KKM = 75</div>
      <div>
        {results ? (
          <>
            {results.map((result, idx) => (
              <Result key={idx} data={result} />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
    </>
  );
};

export default QuizResult;
