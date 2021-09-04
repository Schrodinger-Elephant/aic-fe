import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import TopicSearch from "./TopicSearch";
import SelectedTopic from "./SelectedTopic";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reload: () => void;
}

interface FormType {
  name: string;
  duration: Number;
  topics: string[];
  topicsQues: number[];
  passKey: String;
  date: String;
  time: String
}

const initialState: FormType = {
  name: "",
  duration: 0,
  topics: [],
  topicsQues: [],
  passKey: "",
  date: "",
  time: ""
};

const Modal: FC<Props> = (props) => {
  const [isTopicSearchOpen, setIsTopicSearchOpen] = useState<Boolean>(false);

  const [formData, setFormData] = useState<FormType>(initialState);

  const handleFormChange = (e: any) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addTopic = (newTopic: string) => {
    let topics = formData.topics;
    topics.push(newTopic);
    setFormData({
      ...formData,
      ["topics"]: topics,
    });
  };

  const removeTopic = (topic: string) => {
    let topics = formData.topics;
    topics = topics.filter((elem) => elem !== topic);
    setFormData({
      ...formData,
      ["topics"]: topics,
    });
  };

  const addTopicQues = (e: any, idx: number) => {
    let topicsQues = formData.topicsQues;
    topicsQues[idx] = e.target.value;
    setFormData({
      ...formData,
      ["topicsQues"]: topicsQues,
    });
  };

  const removeTopicQues = (idx: number) => {
    let newTopicQues: number[] = [...formData["topicsQues"]];
    newTopicQues.splice(idx, 1);
    setFormData({
      ...formData,
      ["topicsQues"]: newTopicQues,
    });
  };

  const createQuiz = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`/api/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const resData = await res.json();
    if (resData.success) {
      props.setIsModalOpen(false);
      props.reload();
    }
  };

  return (
    <div className="overflow-auto flex text-black flex-grow fixed left-0 top-0 z-50 h-screen w-screen items-center justify-center bg-blue-200 bg-opacity-70">
      {isTopicSearchOpen ? (
        <TopicSearch
          topics={[""]}
          addTopic={addTopic}
          setIsTopicSearchOpen={setIsTopicSearchOpen}
        />
      ) : (
        <></>
      )}
      <div className="m-16 p-4 w-full border-4 border-white rounded-xl">
        <div className="flex justify-between items-center  mb-4 border-b-2 border-white">
          <h1 className="font-bold">Create New Quiz</h1>
          <div
            onClick={() => props.setIsModalOpen(false)}
            className="cursor-pointer w-8 h-8 flex items-center justify-center p-4 mb-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <form onSubmit={createQuiz} className="flex flex-col">
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
          <label htmlFor="duration">Passkey</label>
          <input
            name="passKey"
            className="p-1 rounded-md focus:ring-2 focus:ring-blue-600"
            type="text"
            onChange={handleFormChange}
          />
          <div className="mt-2 flex w-full border-t-2 border-white"></div>
          <h1 className="font-bold">TOPICS</h1>
          <label htmlFor="topics">Select Topic:</label>
          <div>
            {formData.topics.map((topic, idx) => (
              <div
                key={idx}
                className="flex justify-between border-2 border-white p-2 mb-2 rounded-xl"
              >
                <SelectedTopic
                  removeTopic={removeTopic}
                  topic={topic}
                  idx={idx}
                  removeTopicQues={removeTopicQues}
                />
                <div className="flex justify-end">
                  <input
                    onChange={(e: any) => addTopicQues(e, idx)}
                    className="p-2 rounded-md w-1/2"
                    type="number"
                    placeholder="number of ques"
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={() => setIsTopicSearchOpen(true)}
            className="my-2 flex w-8 h-8 p-2 justify-center items-center border-2 border-white rounded-full cursor-pointer hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>

          <button
            type="submit"
            className="p-2 hover:bg-gray-200 rounded-xl border-2 border-white"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
