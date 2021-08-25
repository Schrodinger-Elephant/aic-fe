import { FC } from "react";

interface currentQuesAndAnswerType {
  question: string;
  options: [string];
  answer: number;
}

interface Props {
  currentQuesAndAnswer: currentQuesAndAnswerType;
  setCurrentQuesAndAnswer: React.Dispatch<
    React.SetStateAction<currentQuesAndAnswerType>
  >;
}

const QuizQuestion: FC<Props> = (props) => {
  return (
    <div>
      <div>{props.currentQuesAndAnswer.question}</div>
      <div>
        {props.currentQuesAndAnswer.options.map((option, idx) => (
          <div key={idx} className="">
            <input type="radio" id="" name="" value=""/>
            <label htmlFor="">{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
