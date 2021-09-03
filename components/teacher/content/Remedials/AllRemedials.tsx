import React, { FC, useEffect, useState } from "react";
import Remedial from "./Remedial";
import RemedialDetail from "./RemedialDetail";

interface Props {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

interface RemedialType {
  name: string;
}
interface RemedialsType extends Array<RemedialType> {}

const tempData = [{ name: "Ulangan1" }, { name: "Ulangan2" }];

const AllRemedials: FC<Props> = (props) => {
  const [view, setView] = useState("List");
  const [remedials, setRemedials] = useState<RemedialsType>(tempData);
  const [remedialId, setRemedialId] = useState<number>(0);

  const reload = async () => {
    const res = await fetch(`/api/remedials`, {
      method: "GET",
    });
    const resData = await res.json();
    if (resData.success) {
      setRemedials(resData.data);
    }
  };
  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      {view === "List" ? (
        <div className="flex flex-col">
          <div className="flex w-full items-center p-2 font-bold">
            All Remedials
          </div>
          {remedials.map((data, idx) => (
            <Remedial
              key={idx}
              idx={idx}
              data={data}
              setView={setView}
              setRemedialId={setRemedialId}
            />
          ))}
        </div>
      ) : view === "Detail" ? (
        <RemedialDetail remedialId={remedialId} setView={setView} />
      ) : (
        <></>
      )}
    </>
  );
};

export default AllRemedials;
