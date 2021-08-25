import React, { FC } from "react";

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
  return (
    <>
      {props.classDatas.map((classData, idx) => (
        <div
          key={idx}
          className="clex p-2 bg-gray-100 border-b-2 border-white hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            props.setView("SelectedClass");
            props.setSelectedClass(idx);
          }}
        >
          {classData.name}
        </div>
      ))}
    </>
  );
};

export default AllClasses;
