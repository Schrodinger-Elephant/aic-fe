import { FC } from "react";
import Classes from "./content/Classes";
import Questions from "./content/QuestionsOld";
import Quizzes from "./content/Quizzes";
import Remedials from "./content/Remedials";

interface Props {
  selectedMenu: string; 
}

const Content: FC<Props> = (props) => {
  return (
    <>
      {props.selectedMenu === "Dashboard" ? (
        <></>
      ) : props.selectedMenu === "Quizzes" ? (
        <Quizzes />
      ) : props.selectedMenu === "Classes" ? (
        <Classes />
      ) : props.selectedMenu === "Remedials" ? (
        <Remedials />
      ) : (
        <></>
      )}
    </>
  );
};

export default Content;
