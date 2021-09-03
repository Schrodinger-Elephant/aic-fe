import Quizevent from "components/quiz/quizevent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// view enum
import {
  OVERDUE,
  STARTED,
  NOT_STARTED,
  VERIFIED,
} from "../../utils/const/quizevents/status.js";

const Quizevents = () => {
  const router = useRouter();
  const { quizeventId } = router.query;

  const [view, setView] = useState<string>("");
  const [quizData, setQuizData] = useState<any>({});

  const [Checktime, setChecktime] = useState<string>("");

  const [identity, setIdentity] = useState<string>("")
  const handleIdentity = (e:any) => {
    setIdentity(e.target.value)
  }

  const [passkey, setPasskey] = useState<string>("");
  const handlePasskey = (e: any) => {
    setPasskey(e.target.value);
  };

  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const testDate = await fetch(
        `http://34.125.39.153:3000/api/quizevents/status/${quizeventId}`,
        {
          method: "GET",
        }
      );
      const testDateData = await testDate.json();
      if (testDateData.success) {
        console.log(testDateData);
        setQuizData(testDateData.data);

        switch (testDateData.status) {
          case OVERDUE:
            setView(OVERDUE);
            break;

          case STARTED:
            setView(STARTED);

            break;

          case NOT_STARTED:
            setView(NOT_STARTED);
            break;

          default:
            break;
        }
      }
    })();
  }, []);
  

  const getQuestions = async () => {
    const questions = await fetch(
      `${process.env.APP_URL}/api/quizevents/${quizeventId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passkey),
      }
    );
    const questionsData = await questions.json();
  };

  return (
    <div className="flex h-screen justify-center p-8">
      <div className="bg-gray-100 bg-opacity-40 border-white p-8 w-full rounded-xl">
        {view === NOT_STARTED || view == OVERDUE ? (
          <>
            <h1 className="font-bold text-4xl p-2">{quizData.quizName}</h1>
            <div className="flex flex-col border-2 border-white p-2">
              <h1 className="font-bold">Start Time: </h1>
              <h2>Date: {quizData.startTime.split(", ")[0]}</h2>
              <h2>Time: {quizData.startTime.split(", ")[1]}</h2>

              <h1 className="font-bold">End Time: </h1>
              <h2>Date: {quizData.endTime.split(", ")[0]}</h2>
              <h2>Time: {quizData.endTime.split(", ")[1]}</h2>
            </div>
            <div className="p-2 flex justify-center bg-red-700 text-white">
              THE QUIZ IS {view}
            </div>
          </>
        ) : view === STARTED ? (
          <div className="flex flex-col justify-center">
            <h1 className="font-bold text-4xl p-2">{quizData.quizName}</h1>
            <div className="flex flex-col w-full justify-center bg-gray-100 p-2 rounded-xl mb-4">
              <h1 className="flex p-2">IDENTITY</h1>
              <input
                onChange={handleIdentity}
                placeholder="format: class_number example: IPA_9D_12"
                className="mb-4 p-2 focus:ring-2 focus:ring-blue-600 rounded-xl"
                type="text"
              />
              <h1 className="flex p-2">INPUT PASSKEY</h1>
              <input
                onChange={handlePasskey}
                placeholder="PASSKEY"
                className="mb-4 p-2 focus:ring-2 focus:ring-blue-600 rounded-xl"
                type="text"
              />
            </div>
            <button
              onClick={() => getQuestions()}
              className="p-2 border-2 border-white rounded-xl hover:bg-white"
            >
              SUBMIT
            </button>
          </div>
        ) : view === "VERIFIED" ? (
          <div>
            {quizData.quizName}
            <Quizevent />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Quizevents;
