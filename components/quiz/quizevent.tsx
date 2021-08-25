import { useEffect, useState } from "react";
import QuizQuestion from "./quizQuestion";

const delme = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0];

interface currentQuesAndAnswerType {
  question: string;
  options: [string];
  answer: number;
}

const initCQAA:currentQuesAndAnswerType = {
  question: "",
  options: [""],
  answer: 0,
};

const Quizevent = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>(delme);
  const [quesAndAnswer, setQuesAndAnswer] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [currentQuesAndAnswer, setCurrentQuesAndAnswer] =
    useState<currentQuesAndAnswerType>(initCQAA);

  useEffect(() => {
    (async () => {
      //   const data = await fetch(``, { method: "GET" });
      //   const dataJSON = await data.json();
      //   const { questions, totalQuestion } = dataJSON;
      //   const questions = [];
      //   const totalQuestion = 10;
      //   let initAnsweredQuestions: number[] = [];
      //   for (let index = 1; index <= totalQuestion; index++) {
      //     initAnsweredQuestions.push(0);
      //   }
      //   setAnsweredQuestions(initAnsweredQuestions);
    })();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex border-2 border-white p-2">
        {answeredQuestions.map((answeredQuestion, idx) => (
          <button
            onClick={() => setCurrentQuestionIdx(idx)}
            key={idx}
            className={`flex justify-center items-center m-1 w-4 h-4 p-3 ${
              answeredQuestion === 1 ? "bg-white" : "bg-gray-200"
            }`}
          >
            {idx}
          </button>
        ))}
      </div>
      <div>Question {currentQuestionIdx + 1}</div>
      <QuizQuestion
        currentQuesAndAnswer={currentQuesAndAnswer}
        setCurrentQuesAndAnswer={setCurrentQuesAndAnswer}
      />
    </div>
  );
};

export default Quizevent;
