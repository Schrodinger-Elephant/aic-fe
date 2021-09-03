import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface RemedialType {
  name: string;
}

interface Props {
  idx: number;
  data: RemedialType;
  setView: React.Dispatch<React.SetStateAction<string>>;
  setRemedialId: React.Dispatch<React.SetStateAction<number>>;
}

const Remedial: FC<Props> = (props) => {
  return (
    <div className="flex justify-between items-center p-2 border-t-2 border-white border-opacity-50">
      Remedial of {props.data.name}
      <button
        onClick={() => {
          props.setRemedialId(props.idx);
          props.setView("Detail");
        }}
        className="bg-green-500 hover:bg-green-600 p-2 px-4 rounded-xl"
      >
        <span className="mr-2">
          <FontAwesomeIcon icon={faEye} />
        </span>
        Details
      </button>
    </div>
  );
};

export default Remedial;
