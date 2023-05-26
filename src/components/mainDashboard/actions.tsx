import { signOut, useSession } from "next-auth/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  AiOutlineSetting,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdOutlinePreview } from "react-icons/md";
import Image from "next/image";
import { AdminDataContext } from "~/context/adminContext";
import { AuthShowcase } from "~/pages";
import { useRouter } from "next/router";

function Actions() {
  const { data: sessionData } = useSession();
  const [isOpen, toggleIsOpen] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    if (!sessionData) push("/");
  }, [sessionData]);

  if (sessionData)
    return (
      <div className=" w-auto">
        {!isOpen ? (
          <ul className="menu rounded-box  bg-base-100">
            <li>
              <a onClick={() => toggleIsOpen(!isOpen)}>
                <Image
                  width={25}
                  height={25}
                  src={sessionData.user.image ?? ""}
                  alt={""}
                />
              </a>
            </li>
          </ul>
        ) : (
          <ul
            onClick={() => console.log("clicked in ul")}
            className="menu rounded-box  bg-base-100"
          >
            <li>
              <a onClick={() => toggleIsOpen(!isOpen)}>
                {sessionData.user?.image && (
                  <Image
                    width={25}
                    height={25}
                    src={sessionData.user.image}
                    alt={""}
                  />
                )}
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  signOut();
                  toggleIsOpen(!isOpen);
                }}
              >
                <AiOutlineLogout className="text-red-500 shadow-xl shadow-red-100" />
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  toggleIsOpen(!isOpen);
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
        )}
      </div>
    );
  else return <h1>error...</h1>;
}

export default Actions;
