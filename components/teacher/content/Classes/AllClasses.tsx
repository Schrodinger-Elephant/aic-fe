import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";
import AClass from "./AClass";
import AddClassModal from "./AddClassModal";

interface classData {
  name: string;
}

interface classDatasType extends Array<classData> {}

interface Props {
  classDatas: classDatasType;
  setSelectedClass: React.Dispatch<React.SetStateAction<number>>;
  setView: React.Dispatch<React.SetStateAction<string>>;
}
const AllClasses: FC<Props> = (props) => {
  const [addClassOpen, setAddClassOpen] = useState(false);

  const closeModal = () => {
    setAddClassOpen(false);
  };

  return (
    <>
      {addClassOpen ? <AddClassModal closeModal={closeModal} /> : <></>}
      <div className="flex justify-between p-2">
        <h1>All Class</h1>
        <button
          onClick={() => setAddClassOpen(true)}
          className="p-2 rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
        >
          <span className="mr-2">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          Add Class
        </button>
      </div>
      {props.classDatas.map((classData, idx) => (
        <AClass
          key={idx}
          idx={idx}
          data={classData}
          setView={props.setView}
          setSelectedClass={props.setSelectedClass}
        />
      ))}
    </>
  );
};

export default AllClasses;
