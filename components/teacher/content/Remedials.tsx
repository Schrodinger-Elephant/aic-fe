import { NextPage } from "next";
import { useState } from "react";
import AllRemedials from "./Remedials/AllRemedials";

const Remedials: NextPage = () => {
  const [remedialId, setRemedialId] = useState<string>("");
  const [view, setView] = useState<string>("AllRemedials");

  return (
    <>
      {view === "AllRemedials" ? (
        <AllRemedials
          remedialId={remedialId}
          setRemedialId={setRemedialId}
          setView={setView}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Remedials;
