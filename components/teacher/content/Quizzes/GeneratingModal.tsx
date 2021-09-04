import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import mascot from "../../../../public/mascot.png";

const GeneratingModal = () => {
  return (
    <div className="text-black fixed z-50 top-0 left-0 flex justify-center items-center h-screen w-screen">
      <div className="bg-white p-8">
        <h1 className="font-bold flex justify-center">Generating Question</h1>
        <div className="flex flex-col justify-center items-center">
          <Image src={mascot} alt="Picture of the author" />

          <h1>Please wait SchroAI doing something amazing!</h1>
          <span className="p-2">
            <FontAwesomeIcon size="1x" icon={faCircleNotch} spin />
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeneratingModal;
