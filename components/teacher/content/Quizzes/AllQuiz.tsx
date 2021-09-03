import React, { FC, useEffect, useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import AQuiz from "./AQuiz";

interface Props {
  setView: React.Dispatch<React.SetStateAction<string>>;
  setQuizId: React.Dispatch<React.SetStateAction<number>>;
  setQuizData: React.Dispatch<React.SetStateAction<any>>;
}

const AllQuiz: FC<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number>(0);

  const [quizzes, setQuizzes] = useState<any>([]);

  const updateQuizzesId = (newId: string, quizIdx: number) => {
    let newQuizzes = [...quizzes];
    newQuizzes[quizIdx].quizquestionId = newId;
    setQuizzes(newQuizzes);
  };

  const reload = async () => {
    const res = await fetch(`/api/quizzes`, {
      method: "GET",
    });
    const resData = await res.json();
    if (resData.success) {
      setQuizzes(resData.data);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/quizzes`, {
        method: "GET",
      });
      const resData = await res.json();
      if (resData.success) {
        setQuizzes(resData.data);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col justify-between items-center text-white blur-lg">
      {isModalOpen ? (
        <Modal setIsModalOpen={setIsModalOpen} reload={reload} />
      ) : (
        <></>
      )}
      <div className="flex w-full items-center justify-between border-b-2 border-white border-opacity-20 pb-2">
        <h1 className="flex p-2">Your Quiz</h1>
        <button
          onClick={()=>setIsModalOpen(true)}
          className="border-2 border-white hover:text-black p-2 px-8 mt-2 rounded-md hover:bg-gray-100"
        >
          <span className="mr-2">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          Add
        </button>
      </div>

      <div className="flex flex-col items-center justify-between p-2 w-full">
        {quizzes.length === 0 ? (
          <>There are no quizzes</>
        ) : (
          quizzes.map((quiz: any, idx: number) => (
            <div
              className="flex w-full items-center justify-between p-2 border-b-2 border-white border-opacity-20"
              key={idx}
            >
              <h1>{quiz.name}</h1>
              <div className="flex">
                <AQuiz
                  quizId={idx}
                  quiz={quiz}
                  updateQuizzesId={updateQuizzesId}
                  setView={props.setView}
                />
                <button
                  onClick={() => {
                    setSelectedQuizIdx(idx);
                    props.setQuizData(quizzes[idx]);
                    props.setQuizId(idx);
                    props.setView("QuizQuestions");
                  }}
                  className="flex items-center bg-blue-500 rounded-xl px-2"
                >
                  <span className="flex justify-center items-center p-2">
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                  Questions
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllQuiz;
