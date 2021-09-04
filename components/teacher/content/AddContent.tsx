import { useState } from "react";

const AddContent = () => {
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
      setTimeout(() => {
        setNotif("Success!");
      }, 2000);
    }
  };

  return (
    <form onSubmit={createContent}>
      {notif !== "" ? <div>{notif}</div> : <></>}
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
  );
};

export default AddContent;
