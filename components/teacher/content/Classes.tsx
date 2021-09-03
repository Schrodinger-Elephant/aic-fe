import { useEffect, useState } from "react";
import AllClasses from "./Classes/AllClasses";
import SelectedClass from "./Classes/SelectedClass";

const Classes = () => {
  const [view, setView] = useState<string>("AllClasses");

  const [classDatas, setClassDatas] = useState([]);
  const [selectedClass, setSelectedClass] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/classes`, {
          method: "GET",
        });
        const resData = await res.json();
        console.log("test", resData.data);
        setClassDatas(resData.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <div>
      {view === "AllClasses" ? (
        <AllClasses
          classDatas={classDatas}
          setSelectedClass={setSelectedClass}
          setView={setView}
        />
      ) : (
        <SelectedClass selectedClass={selectedClass} setView={setView} />
      )}
    </div>
  );
};

export default Classes;
