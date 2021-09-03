import { FC, useState } from "react";

interface Props {
  closeModal: () => void;
}

const AddClassModal: FC<Props> = (props) => {
  const [formData, setFormData] = useState({});

  const handleFormChange = (e: any) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center">
      <form action="">
        <div className="flex flex-col p-2 rounded-xl border-2 border-white border-opacity-50">
          <label htmlFor="name">Class name:</label>
          <input
            type="text"
            name="passKey"
            className="bg-gray-900 p-1 rounded-md focus:ring-2 focus:ring-blue-600"
            onChange={handleFormChange}
          />

          <div className="mt-8 flex justify-between">
            <button
              onClick={props.closeModal}
              className="bg-gradient-to-r from-purple-700 to-pink-700 hover:bg-blue-600 p-2 rounded-xl p-2 px-4"
            >
              Cancel
            </button>
            <button
              className="bg-gradient-to-r from-purple-700 to-pink-700 hover:bg-blue-600 p-2 rounded-xl p-2 px-4"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddClassModal;
