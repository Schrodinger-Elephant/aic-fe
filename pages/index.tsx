import { faBookOpen, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import background from "../public/background.jpg";
import mascot from "../public/mascot.png";

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/home");
  };
  return (
    <div>
      <Head>
        <title>AIC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-center overflow-scroll">
          <div className="flex flex-col w-screen">
            <div
              style={{ backgroundImage: `url(${background})` }}
              className="p-24 flex flex-col text-white bg-blue-500 w-full"
            >
              <div className="flex justify-center text-2xl">Hi Teacher,</div>
              <div className="flex justify-center">
                <h1>
                  We help you to save time and <br />
                  generate <b> Remedial </b> Questions
                </h1>
              </div>

              <div className="animate-pulse m-4 text-white font-bold flex justify-center">
                <button
                  onClick={handleClick}
                  className="animate-bounce px-4 font-bold p-2 border-2 border-gray-200 hover:bg-blue-700"
                >
                  Try Now!
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-200 text-blue-400 font-bold flex justify-center text-2xl">
              Explore what we could do for You!
            </div>
            <div className="flex justify-between bg-gray-200">
              <div className="flex p-4">
                <div className="p-4">
                  <FontAwesomeIcon size="5x" icon={faClock} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Saving Time</h1>
                  <h1>
                    Create questions and solutions for your quiz in less than 1
                    minute
                  </h1>
                  <h1>Explore more...</h1>
                </div>
              </div>
              <div className="flex p-4">
                <div className="p-4">
                  <FontAwesomeIcon size="5x" icon={faBookOpen} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Generate Remedial</h1>
                  <h1>
                    We help you to generate unique questions for doing your
                    Remedial session
                  </h1>
                  <h1>Explore more...</h1>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-blue-400 p-4 text-2xl font-bold">
              Saving Time
            </div>
            <div className="flex justify-between px-8">
              <div className="rounded-xl border-2 border-gray-200 p-4 mr-4">
                <div className="text-black text-2xl font-bold">Topic</div>
                <div>
                  Just pick the topic that you want to assess and our Artificial
                  Intelligence would generate the related questions for you. We
                  have our own designed knowledge point based on Kemendikbud
                  Curriculums.
                </div>
              </div>
              <div className="rounded-xl border-2 border-gray-200 p-4 ml-4">
                <div className="text-black text-2xl font-bold">
                  Solution Generator
                </div>
                <div>
                  We would generate the solution associated with the questions
                  with built-in Artificial Intelligence model. When your
                  students get incorrect answers, our system would give the
                  right answer with its way to get answer
                </div>
              </div>
            </div>
            <div className="flex justify-center text-blue-400 p-4 text-2xl font-bold">
              Generate Remedial
            </div>
            <div className="flex justify-center w-full">
              <div className="flex flex-col border-2 border-gray-200 mx-8 mb-8 p-4 rounded-xl w-1/3">
                <div className="font-bold text-2xl">Re-Generate</div>
                <div className="">
                  You could use our system to generate the questions adaptively
                  for Remedial. Our Artificial Intelligence would only assess
                  the area which your student lack of.
                </div>
              </div>
            </div>
            <div className="bg-gray-200 p-4 flex flex-col items-center">
              <div className="text-blue-400 font-bold flex justify-center text-2xl pb-4">
                Who Would Do This?
              </div>
              <div className="w-1/2">
                <div className="flex p-4 bg-white border-2 border-gray-200 rounded-xl">
                  <div className="px-4">
                    <Image src={mascot} alt="Picture of the author" />
                  </div>
                  <div className="">
                    <h1 className="font-bold">SchoAI</h1>
                    <h1>
                      Let us introduce to you to SchoAI. He is our trained NLP
                      model would help you to generate the questions solutions,
                      and generate unique Remedial questions
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
