import type { NextPage } from "next";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faHourglassHalf,
  faUserCircle,
  faEllipsisV,
  faBookOpen,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import Content from "./Content";

const menusList = [
  {
    name: "Dashboard",
    icon: faColumns,
  },
  {
    name: "Classes",
    icon: faBookOpen,
  },
  {
    name: "Quizzes",
    icon: faHourglassHalf,
  },
  {
    name: "Remedials",
    icon: faUndo,
  },
];

const Layout: NextPage = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("Quizzes");

  return (
    <div className="flex flex-col w-screen h-screen text-black">
      <div className="h-screen border-2 border-white border-opacity-50 bg-white bg-opacity-40 blur-xl rounded-lg m-8 p-2">
        <div className="flex"></div>
        {isOpen ? (
          <div
            style={{ backgroundColor: "rgb(130,60,77)" }}
            className="fixed top-0 left-0 flex flex-col bg-purple-400 border-2 border-white border-opacity-50 h-screen"
          >
            <div
              style={{ backgroundColor: "rgb(130,60,77)" }}
              className="flex items-center w-56 px-2 py-4 bg-purple-700 bg-opacity-70"
            >
              <FontAwesomeIcon
                icon={faEllipsisV}
                className="cursor-pointer mx-2"
                onClick={() => setIsOpen(!isOpen)}
              />
              <h1 className="text-xl">Menu - {selectedMenu}</h1>
            </div>
            {menusList.map((menu, idx) => (
              <div
                key={idx}
                className={`flex cursor-pointer items-center p-2 ${
                  menu.name === selectedMenu ? "bg-pink-400 font-bold" : null
                }`}
                onClick={() => {
                  setSelectedMenu(menu.name);
                  setIsOpen(false);
                }}
              >
                <FontAwesomeIcon
                  icon={menu.icon}
                  className="cursor-pointer mx-2"
                />
                <h1 className="text-md">{menu.name}</h1>
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex justify-between items-center pb-2 border-b-2 border-white">
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="cursor-pointer mx-2"
              onClick={() => setIsOpen(!isOpen)}
            />
            <h1 className="text-xl">{selectedMenu}</h1>
          </div>
          <FontAwesomeIcon
            size="2x"
            icon={faUserCircle}
            className="cursor-pointer"
          />
        </div>

        <Content selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export default Layout;
