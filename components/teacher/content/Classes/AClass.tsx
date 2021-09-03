import { faInfo, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useState } from "react";

interface formDataType {
  className: string;
  numOfStudents: number;
}

interface ModalProps {
  name: string;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddStudentModal: FC<ModalProps> = (props) => {
  const [formData, setFormData] = useState<formDataType>({
    className: props.name,
    numOfStudents: 0,
  });
  const handleFormData = (e: any) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addStudents = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`/api/users/addstudents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const resData = await res.json();
    if (resData.success) {
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-screen flex justify-center items-center">
      <form onSubmit={addStudents}>
        <div className="flex flex-col p-2 border-2 border-white border-opacity-50 rounded-xl">
          <label htmlFor="numOfStudents">Number Of Students</label>
          <input
            type="number"
            name="numOfStudents"
            onChange={handleFormData}
            className="bg-gray-900 p-2 rounded-xl"
          />
          <div className="flex justify-between">
            <button onClick={() => props.setModalShow(false)}>Cancel</button>
            <button type="submit" className="">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

interface Props {
  idx: number;
  data: {
    name: string;
  };
  setView: React.Dispatch<React.SetStateAction<string>>;
  setSelectedClass: React.Dispatch<React.SetStateAction<number>>;
}

const AClass: FC<Props> = (props) => {
  const [modalShow, setModalShow] = useState<boolean>(true);
  return (
    <>
      {modalShow ? (
        <AddStudentModal name={props.data.name} setModalShow={setModalShow} />
      ) : (
        <></>
      )}
      <div className="flex justify-between p-2 border-t-2 border-white border-opacity-50">
        {props.data.name}
        <div className="flex items-center">
          <button
            onClick={() => {
              props.setView("SelectedClass");
              props.setSelectedClass(props.idx);
            }}
            className="p-2 rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faInfo} />
            </span>
            Details
          </button>

          <button
            onClick={() => setModalShow(true)}
            className="p-2 rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          >
            <span className="mr-2">
              <FontAwesomeIcon icon={faUsers} />
            </span>
            Add Students
          </button>
        </div>
      </div>
    </>
  );
};

export default AClass;
