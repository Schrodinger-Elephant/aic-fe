import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface Props {
  remedialId: number;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const RemedialDetail: FC<Props> = (props) => {
  return (
    <div className="">
      <div className="p-2 flex items-center">
        <span
          onClick={() => props.setView("List")}
          className="cursor-pointer hover:bg-gray-200 mr-2 rounded-full w-8 h-8  flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </span>
        Detail Remedial...
        <div>Lisf of Students</div>
      </div>
      <div></div>
    </div>
  );
};

export default RemedialDetail;
