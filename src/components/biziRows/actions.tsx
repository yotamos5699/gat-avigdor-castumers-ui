import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AiOutlineSetting, AiOutlineHome } from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { AdminDataContext } from "~/context/adminContext";

function Actions() {
  const [isOpen, toggleIsOpen] = useState(false);
  const { setRenderdScreen } = useContext(AdminDataContext);
  return (
    <div className=" fixed top-2 right-2">
      {!isOpen ? (
        <ul className="menu rounded-box  bg-base-100">
          <li>
            <a onClick={() => toggleIsOpen(!isOpen)}>
              <RxHamburgerMenu className=" text-blue-300" size={"20px"} />
            </a>
          </li>
        </ul>
      ) : (
        setRenderdScreen && (
          <ul className="menu rounded-box bg-base-100">
            <li>
              <a
                onClick={() => {
                  toggleIsOpen(!isOpen);
                  setRenderdScreen("admin");
                }}
              >
                <AiOutlineHome className=" text-blue-300" size={"20px"} />
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  toggleIsOpen(!isOpen);
                  setRenderdScreen("main");
                }}
              >
                <AiOutlineSetting className=" text-blue-300" size={"20px"} />
              </a>
            </li>
            <li>
              <a onClick={() => toggleIsOpen(!isOpen)}>
                <MdOutlinePreview className=" text-blue-300" size={"20px"} />
              </a>
            </li>
          </ul>
        )
      )}
    </div>
  );
}

export default Actions;
