import { NextPage } from "next";
import { useState } from "react";
import AllRemedials from "./Remedials/AllRemedials";
import RemedialDetail from "./Remedials/RemedialDetail";

const Remedials: NextPage = () => {
  const [view, setView] = useState<string>("AllRemedials");
  return (
    <>{view === "AllRemedials" ? <AllRemedials setView={setView} /> : <></>}</>
  );
};

export default Remedials;
