import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";

interface Props {
  selectedClass: number;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const SelectedClass: FC<Props> = (props) => {
  const [classData, setclassData] = useState({});
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/classes/${props.selectedClass}`,
        { method: "GET" }
      );

      const resData = await res.json();
      console.log(resData);
      setclassData(resData.data);
    })();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div
        onClick={() => props.setView("AllClasses")}
        className="cursor-pointer p-2 hover:bg-gray-300 w-8 h-8 flex items-center justify-center rounded-full mr-2">
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        Class
      </div>
      <div className="flex">
        <h1>Students:</h1>
      </div>
      <div>
        <h1>Past Quizzes</h1>
        <div className=""> 
          <div>Quiz 1...</div>
          <div>Quiz 2...</div>
        </div>
      </div>

      <div className="rounded-xl border-4 border-white p-2">Start Quiz</div>
    </div>
  );
};

export default SelectedClass;
