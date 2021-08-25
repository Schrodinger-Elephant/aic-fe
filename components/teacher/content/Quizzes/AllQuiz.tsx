import React, { FC, useEffect, useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCheck,
  faCog,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import ModalSetting from "./ModalSetting";
import AQuiz from "./AQuiz";

interface Props {
  setView: React.Dispatch<React.SetStateAction<string>>;
  setQuizId: React.Dispatch<React.SetStateAction<number>>;
  setQuizData: React.Dispatch<React.SetStateAction<any>>;
}

const AllQuiz: FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isModalSettingOpen, setIsModalSettingOpen] = useState<boolean>(false);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number>(0);

  const [quizzes, setQuizzes] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/quizzes`, {
        method: "GET",
      });
      const resData = await res.json();
      if (resData.success) {
        console.log(resData.data);
        setQuizzes(resData.data);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col justify-between items-center">
      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : <></>}
      {isModalSettingOpen ? (
        <ModalSetting
          quizData={quizzes[selectedQuizIdx]}
          setIsModalSettingOpen={setIsModalSettingOpen}
        />
      ) : (
        <></>
      )}
      <div className="flex w-full items-center justify-between border-b-2 border-white pb-2">
        <h1 className="flex p-2">Your Quiz</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-white p-2 mt-2 rounded-md hover:bg-gray-100"
        >
          Add New Quiz
        </button>
      </div>

      <div className="flex flex-col items-center justify-between bg-gray-100 p-2 mt-2 w-full">
        {quizzes.length === 0 ? (
          <>There are no quizzes</>
        ) : (
          quizzes.map((quiz: any, idx: number) => (
            <div
              className="flex w-full items-center justify-between p-2 border-4 border-white rounded-xl mb-2"
              key={idx}
            >
              <h1>{quiz.name}</h1>
              <div className="flex">
                <AQuiz quiz={quiz}/>
                <span
                  onClick={() => {
                    setIsModalSettingOpen(true);
                    setSelectedQuizIdx(idx);
                    props.setQuizData(quizzes[idx]);
                    props.setView("QuizQuestions");
                    props.setQuizId(idx);
                  }}
                  className="cursor-pointer h-8 w-8 rounded-full flex justify-center items-center hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span
                  onClick={() => {
                    setIsModalSettingOpen(true);
                    setSelectedQuizIdx(idx);
                  }}
                  className="cursor-pointer h-8 w-8 rounded-full flex justify-center items-center hover:bg-gray-200"
                >
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllQuiz;
