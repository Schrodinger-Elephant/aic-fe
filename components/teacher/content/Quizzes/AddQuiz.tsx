import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface Props {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const AddQuiz: FC<Props> = (props) => {
  return (
    <div className="">
      <div className="flex items-center">
        <span className="h-8 w-8 flex justify-center items-center">
          <FontAwesomeIcon icon={faAngleLeft} />
        </span>
        Add Quiz
      </div>
    </div>
  );
};

export default AddQuiz;
