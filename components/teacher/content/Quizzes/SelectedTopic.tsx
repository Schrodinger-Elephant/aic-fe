import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface Props {
  removeTopic: (topic: string) => void;
  topic: string;
  removeTopicQues: (idx: number) => void;
  idx: number;
}

const SelectedTopic: FC<Props> = (props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h1>{props.topic}</h1>
      <button
        onClick={() => {
          props.removeTopic(props.topic);
          props.removeTopicQues(props.idx);
        }}
        className="ml-2 w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default SelectedTopic;
