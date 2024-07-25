
import { CgProfile } from "react-icons/cg";
import { BiMenu } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Reuseables/Button";
import { useContext,  useRef, useState } from "react";
import { ContextApi } from "../App";
import { FaHandsHelping } from "react-icons/fa";
import Profile from "../User_pages/Profile";

function Nav({ activeRoute }: { activeRoute?: string }) {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const { toggleSideNav } = useContext(ContextApi);
  const signupRoute = useNavigate();
  const menu = useRef<HTMLDivElement>(null);

  const routesArray = [
    {
      routes: "/jobs",
      routes_text: "Jobs",
    },
    {
      routes: "/companies",
      routes_text: "Companies",
    },
    {
      routes: "/about-us",
      routes_text: "About Us",
    },
  ];

  const token = localStorage.getItem("AccessToken");
  function viewMenu() {
    toggleSideNav.current?.classList.replace("hidden", "block");
    setTimeout(() => {
      toggleSideNav.current?.classList.replace(
        "translate-x-full",
        "translate-x-0"
      );
    }, 300);
    // document.body.classList.add('overflow-hidden')
  }

  function handlePop() {
    setIsProfileClicked(true);
  }

 

  return (
    <>
      <div className="w-full h-auto flex justify-between px-20 max-lg:px-3 max-lg:p-2 shadow-sm shadow-zinc-400">
        <div className="flex items-center gap-16">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-blue-700 rounded-md flex justify-center items-center">
              <FaHandsHelping className="text-2xl text-white" />
            </div>
            <div className="font-bold text-2xl text-blue-700 max-lg:text-xl">
              <Link to={"/"}>Konnect</Link>
            </div>
          </div>
          <div className="flex items-center justify-between  gap-9 text-sm font-semibold  text-gray-500 cursor-pointer max-lg:hidden">
            {routesArray.map((routesArray, index: number) => (
              <Link to={routesArray.routes} key={index}>
                <div
                  className={`h-[60px] flex items-center ${
                    activeRoute == routesArray.routes
                      ? "border-b border-blue-700"
                      : " hover:border-blue-700 hover:border-b"
                  }`}
                >
                  {routesArray.routes_text}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex  items-center gap-3 max-lg:gap-2  font-semibold cursor-pointer text-gray-500">
          {!token ? (
            <Button
              btn_text={"Sign Up"}
              additionalclass="max-lg:p-2"
              handleClick={() => {
                signupRoute("/signup");
              }}
            />
          ) : (
            <div>
              <div className="flex gap-3 text-2xl">
                {/* <IoIosNotificationsOutline /> */}
                <div onClick={handlePop}>
                  <CgProfile />
                </div>
              </div>
              {isProfileClicked && (
                <Profile setIsProfileClicked={setIsProfileClicked} />
              )}
            </div>
          )}

          <Link to={"/employer"}>
            <div className="h-[60px] flex items-center  hover:border-blue-700 hover:border-b  max-lg:hidden">
              Post Job/Employers
            </div>
          </Link>
          <div onClick={viewMenu}>
            <div className="hidden max-lg:text-2xl max-lg:block" ref={menu}>
              <BiMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
