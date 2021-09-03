import {
  faAngleLeft,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect } from "react";

interface Props {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const QuizResult: FC<Props> = (props) => {

  useEffect(() => {
    (async() => {
      const res = await fetch(`/api/remedials/`, {
        method: "GET"
      })
      const resData = await res.json()
      if(resData.success){

      }
    })()
  }, [])

  const createRemedial = async () => {
    const res = await fetch(`/api/remedials/`, { method: "POST" });
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center">
          <span
            onClick={() => props.setView("AllQuiz")}
            className="cursor-pointer h-8 w-8 rounded-full flex justify-center items-center hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
          Result of
        </div>
        <button className="p-2 bg-gradient-to-r from-purple-400 via-pink-500 hover:bg-blue-900 rounded-xl">
          <span className="mr-2">
            <FontAwesomeIcon icon={faBrain} />
          </span>
          Create Remedial!
        </button>
        <button className="p-2 bg-gradient-to-r from-purple-400 via-pink-500 hover:bg-blue-900 rounded-xl">
          <span className="mr-2">
            <FontAwesomeIcon icon={faBrain} />
          </span>
          Generate Remedial Question !
        </button>
      </div>
      <div className="p-2">Total Students: 5 Some Chart??</div>
      <div className="p-2">KKM = 75</div>
    </div>
  );
};

export default QuizResult;
