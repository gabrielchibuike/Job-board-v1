import { IoIosArrowForward } from "react-icons/io";
import { FaHandsHelping } from "react-icons/fa";
import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ContextApi } from "../App";
import Button from "../Reuseables/Button";
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
    routes: "/employer",
    routes_text: "Post Job/Employers",
  },
  {
    routes: "/privacy",
    routes_text: "pravacy",
  },
  {
    routes: "/help",
    routes_text: "Help",
  },
];
function SideNav() {
  const { toggleSideNav } = useContext(ContextApi);
  const direct = useNavigate();

  function closeMenu() {
    setTimeout(() => {
      toggleSideNav.current?.classList.replace("block", "hidden");
    }, 300);
    toggleSideNav.current?.classList.replace(
      "translate-x-0",
      "translate-x-full"
    );
    // document.body.classList.remove("overflow-hidden");
  }

  return (
    <>
      <section
        className="w-[100%] fixed top-0 left-0 translate-x-full transition ease-linear bg-white text-black h-full z-50 hidden lg:hidden p-3"
        ref={toggleSideNav}
      >
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="w-7 h-7 bg-blue-700 rounded-md flex justify-center items-center">
              <FaHandsHelping className="text-2xl text-white" />
            </div>
            <div className="font-bold text-xl text-blue-700 ">Konnect</div>
          </div>
          <div className="cursor-pointer max-lg:text-2xl " onClick={closeMenu}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="mt-4 ">
          {routesArray.map((routesArray, index) => (
            <Link to={routesArray.routes} key={index}>
              <div
                className={`flex justify-between max-lg:text-sm font-medium text-zinc-500 py-3 border-b-[1px] border-zinc-300`}
              >
                {routesArray.routes_text}
                <IoIosArrowForward className="text-lg text-zinc-400" />
              </div>
            </Link>
          ))}
          <div className="w-full mt-8">
            <Button
              btn_text="Logout"
              additionalclass="max-lg:w-full max-lg:text-center text-lg  max-lg:py-3 rounded-lg"
              type="submit"
              handleClick={() => {
                localStorage.removeItem("AccessToken");
                setTimeout(() => {
                  direct("/login");
                }, 2000);
              }}
            />
          </div>
        </div>
      </section>
      {/* </div> */}
    </>
  );
}

export default SideNav;
