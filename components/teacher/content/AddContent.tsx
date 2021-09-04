import { useState } from "react";
import { useRouter } from "next/router";

const AddContent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({});
  const [notif, setNotif] = useState<string>("");

  const handleFormChange = (e: any) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createContent = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`/api/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const resData = await res.json();
    if (resData.success) {
      setNotif("Success!");
      setTimeout(() => {
        setNotif("");
      }, 1500);
    }
  };

  return (
    <>
      {notif !== "" ? (
        <div className="fixed z-50 top-10 left-0 flex w-screen justify-center items-center">
          <div className="border-2 border-white rounded-full p-4 bg-black text-white bg-opacity-50">
            Content Added Successfully!
          </div>
        </div>
      ) : (
        <></>
      )}
      <form onSubmit={createContent}>
        <div className="flex flex-col p-2">
          <label htmlFor="topic">Topic</label>
          <input
            onChange={handleFormChange}
            className="p-2 rounded-xl"
            type="text"
            placeholder="Topic"
            name="topic"
          />
          <label htmlFor="content">Content</label>
          <textarea
            onChange={handleFormChange}
            className="p-2 rounded-xl"
            placeholder="Content"
            name="content"
          ></textarea>
          <button
            className="rounded-xl border-2 border-white p-2 mt-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddContent;
