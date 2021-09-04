import React, { FC, useEffect, useState } from "react";
import Remedial from "./Remedial";
import RemedialDetail from "./RemedialDetail";

interface Props {
  remedialId: string;
  setRemedialId: React.Dispatch<React.SetStateAction<string>>;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

interface RemedialType {
  _id: string;
  quiz: any;
}
interface RemedialsType extends Array<RemedialType> {}

const tempData = [
  { _id: "Ulangan1", name: "Loading", quiz: [{ name: "" }] },
];

const AllRemedials: FC<Props> = (props) => {
  const [view, setView] = useState("List");
  const [remedials, setRemedials] = useState<RemedialsType>(tempData);

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
              setRemedialId={props.setRemedialId}
            />
          ))}
        </div>
      ) : view === "Detail" ? (
        <RemedialDetail remedialId={props.remedialId} setView={setView} />
      ) : (
        <></>
      )}
    </>
  );
};

export default AllRemedials;
