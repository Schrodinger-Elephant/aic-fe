import { UserquizType } from "data/interfaces/Userquiz";
import { FC, useEffect, useState } from "react";

interface Props {
  data: UserquizType;
}

const Result: FC<Props> = (props) => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/users/${props.data.studentId}`, {
        method: "GET",
      });

      const resData = await res.json();
      if (resData.success) {
        setUserData(resData.data);
      }
    })();
  }, [props.data.studentId]);

  return (
    <div className="flex p-2 border-b-2 border-white">
      <h1 className="mr-2">{userData?.username}</h1>
      <h1>Grade:{props.data.grade}</h1>
    </div>
  );
};

export default Result;
