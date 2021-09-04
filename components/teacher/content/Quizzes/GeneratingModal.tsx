import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GeneratingModal = () => {
  return (
    <div className="text-black fixed z-50 top-0 left-0 flex justify-center items-center h-screen w-screen">
      <div className="bg-white p-8">
        <h1 className="font-bold">Generating Question.</h1>
        <div className="flex flex-col justify-center items-center">
          <span className="p-8 m-4">
            <FontAwesomeIcon size="8x" icon={faCircleNotch} spin />
          </span>
          <h1>Please wait us doing something amazing!</h1>
        </div>
      </div>
    </div>
  );
};

export default GeneratingModal;
