import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { quizType } from "data/interfaces/Quizzes";
import { FC, useState } from "react";

interface Props {
  quizData: quizType;
  setIsModalSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSetting: FC<Props> = (props) => {
  const [formData, setFormData] = useState({});

  const handleFormChange = (e: any) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateQuizConfig = () => {};

  return (
    <div className="flex flex-grow fixed left-0 top-0 w-0 h-screen w-screen items-center justify-center bg-blue-200 bg-opacity-70">
      <div className="m-16 p-4 w-full border-4 border-white rounded-xl">
        <div className="flex justify-between items-center  mb-4 border-b-2 border-white">
          <h1 className="font-bold">Config Config</h1>
          <div
            onClick={() => props.setIsModalSettingOpen(false)}
            className="cursor-pointer w-8 h-8 flex items-center justify-center p-4 mb-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <form onSubmit={updateQuizConfig} className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            className="p-1 rounded-md focus:ring-2 focus:ring-blue-600"
            type="text"
            onChange={handleFormChange}
          />
          <label htmlFor="Date">Date</label>
          <input
            name="date"
            className="p-1 rounded-md focus:ring-2 focus:ring-blue-600"
            type="date"
            onChange={handleFormChange}
          />
          <label htmlFor="Date">Time (--:-- AM/PM)</label>
          <input
            name="time"
            className="p-1 rounded-md focus:ring-2 focus:ring-blue-600"
            type="time"
            onChange={handleFormChange}
          />
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            name="duration"
            className="p-1 rounded-md focus:ring-2 focus:ring-blue-600"
            type="number"
            onChange={handleFormChange}
          />
          <div className="mt-2 flex w-full border-t-2 border-white"></div>
          <h1 className="font-bold">TOPICS</h1>

          <button
            type="submit"
            className="p-2 hover:bg-gray-200 rounded-xl border-2 border-white"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalSetting;
