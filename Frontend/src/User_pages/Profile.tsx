import { MdArrowForwardIos } from "react-icons/md";
import { MdCreditScore } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { IoIosHelpCircle } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import SavedJob from "../Reuseables/SavedJob";
import { useEffect, useRef, useState } from "react";
import AppliedJob from "../Reuseables/AppliedJob";
import { BiLeftArrowAlt } from "react-icons/bi";
import Settings from "../Reuseables/Settings";
import HelpCenter from "../Reuseables/HelpCenter";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
function Profile({
  setIsProfileClicked,
}: {
  setIsProfileClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const IsActive = useRef<HTMLDivElement[]>([]);
  const target = useRef<HTMLDivElement>(null);
  const target2 = useRef<HTMLDivElement>(null);
  const animate = useRef<HTMLDivElement[]>([]);
  const [SavedJobIsOpen, setSavedJobIsOpen] = useState(false);
  const [IsApplied, setIsApplied] = useState(false);
  const [, setManageJob] = useState(false);
  const [SettingIsOpen, setSettingJobIsOpen] = useState(false);
  const [helpCenter, setHelpCenter] = useState(false);
  const direct = useNavigate();

  const list = [
    {
      icon: <BsFillBookmarkFill />,
      Title: "Saved Job",
    },
    {
      icon: <MdCreditScore />,
      Title: "Applied Jobs",
    },
    {
      icon: <AiOutlineSetting />,
      Title: "Settings",
    },
    {
      icon: <IoIosHelpCircle />,
      Title: "Help Center",
    },
    {
      icon: <CgLogOut />,
      Title: "Logout",
    },
  ];

  interface newJwtPayLoad extends JwtPayload {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    desired_jobs: string;
  }
  const token = localStorage.getItem("AccessToken");
  const decoded: newJwtPayLoad = jwtDecode(token!);


  function closePop() {
    setIsProfileClicked(false);
  }

  function BackArrow() {
    if (
      target.current?.classList.contains("max-lg:hidden") &&
      target2.current?.classList.contains("block")
    ) {
      target.current?.classList.replace("max-lg:hidden", "block");
      target2.current?.classList.replace("block", "max-lg:hidden");
    } else {
      setIsProfileClicked(false);
    }
  }

  function handleSelect(index: number) {
    console.log(index);
    IsActive.current.forEach((e) => {
      e.classList.remove("border-l-4", "border-blue-700");
    });
    IsActive.current[index]!.classList.add("border-l-4", "border-blue-700");

    target.current?.classList.replace("block", "max-lg:hidden");
    target2.current?.classList.replace("max-lg:hidden", "block");

    if (index == 0) {
      setSettingJobIsOpen(false);
      setHelpCenter(false);
      setIsApplied(false);
      setManageJob(false);
      setSavedJobIsOpen(true);
    } else if (index == 1) {
      setSavedJobIsOpen(false);
      setSettingJobIsOpen(false);
      setManageJob(false);
      setHelpCenter(false);
      setIsApplied(true);
    } else if (index == 2) {
      setSavedJobIsOpen(false);
      setIsApplied(false);
      setManageJob(false);
      setHelpCenter(false);
      setSettingJobIsOpen(true);
    } else if (index == 3) {
      setSavedJobIsOpen(false);
      setIsApplied(false);
      setManageJob(false);
      setSettingJobIsOpen(false);
      setHelpCenter(true);
    } else if (index == 4) {
      localStorage.removeItem("AccessToken");
      setTimeout(() => {
        direct("/login");
      }, 2000);
    }
  }

  useEffect(() => {
    list.forEach((_, index) => {
      if (index == 0) {
        IsActive.current.forEach((e) => {
          e.classList.remove("border-l-4", "border-blue-700");
        });
        IsActive.current[index]!.classList.add("border-l-4", "border-blue-700");
        setSavedJobIsOpen(true);
      }
    });
  }, []);
  return (
    <>
      <div className="w-full h-scree flex justify-center items-center backdrop-blur  fixed top-0 left-0 bottom-0  z-[100] bg-[#00000018]">
        <div
          className="w-full max-w-[60%] min-h-[450px] bg-white  rounded-xl px-7 py-2 max-lg:max-w-full 
        max-lg:h-screen max-lg:px-3"
        >
          <div
            className="flex justify-end py-1 text-xl max-lg:hidden"
            onClick={closePop}
          >
            <CgClose />
          </div>
          <div className="flex items-center gap-3  max-lg:pt-1"></div>
          <div className="  flex">
            <div className="w-[50%] max-lg:w-full  block" ref={target}>
              <div className="flex gap-3 lg:hidden">
                <div onClick={BackArrow}>
                  <BiLeftArrowAlt className="text-3xl text-zinc-500" />
                </div>
                <span className="text-lg max-lg:text-xl text-zinc-600 ">
                  Profile
                </span>
              </div>
              <div className="flex gap-3 items-center max-lg:mt-2 ">
                <div className="w-[80px] h-[80px] max-lg:w-[60px] max-lg:h-[60px]  rounded-full bg-green-800 flex justify-center items-center">
                  <p className="font-bold flex items-center text-white text-[50px] max-lg:text-[40px] capitalize">
                    {`${decoded.firstName.split("")[0]}`}
                  </p>
                </div>
                <div>
                  <p className="max-lg:text-xl">
                    {` ${decoded.firstName} ${decoded.lastName}`}
                  </p>
                  <p className="text-sm font-normal ">{decoded.email}</p>
                  <p className="text-sm font-normal">
                    {decoded.desired_jobs[0]}
                  </p>
                </div>
              </div>
              <div className=" font-normal text-sm  max-lg:rounded-2xl max-lg:mt-3 mt-4">
                {list.map((list, index) => (
                  <div
                    className="flex justify-between items-center max-lg:border-b-[1px] max-lg:border-zinc-300 hover:bg-zinc-100  py-3 max-lg:py-4 px-4 rounded-lg "
                    onClick={() => handleSelect(index)}
                    ref={(element: HTMLDivElement) => {
                      IsActive.current[index] = element;
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{list.icon}</span>
                      <div className="max-lg:text-sm font-medium">{list.Title}</div>
                    </div>
                    <div>
                      <MdArrowForwardIos />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="w-[50%] h-[400px] overflow-y-scroll  max-lg:hidden max-lg:w-full max-lg:min-h-screen"
              ref={target2}
            >
              {SavedJobIsOpen && (
                <div className="">
                  <div className="flex gap-3">
                    <div onClick={BackArrow}>
                      <BiLeftArrowAlt className="text-3xl text-zinc-500 lg:hidden" />
                    </div>
                    <h2 className="text-base max-lg:text-xl ">Saved Job</h2>
                  </div>
                  <SavedJob animate={animate} />
                </div>
              )}
              {IsApplied && (
                <div className="">
                  <div className="flex  ">
                    <div onClick={BackArrow}>
                      <BiLeftArrowAlt className="text-3xl text-zinc-500 lg:hidden" />
                    </div>
                    <h2 className="text-lg max-lg:text-xl ">Applied Job</h2>
                  </div>
                  <AppliedJob animate={animate} />
                </div>
              )}
              {SettingIsOpen && (
                <div className="w-full  flex flex-col justify-center ">
                  <div className="flex gap-2 ">
                    <div onClick={BackArrow}>
                      <BiLeftArrowAlt className="text-3xl text-zinc-500 lg:hidden" />
                    </div>
                    <h2 className="text-lg max-lg:text-xl">Settings</h2>
                  </div>
                  <Settings />
                </div>
              )}
              {helpCenter && (
                <div className="">
                  <div className="flex ">
                    <div onClick={BackArrow}>
                      <BiLeftArrowAlt className="text-3xl text-zinc-500 lg:hidden" />
                    </div>
                    <h2 className="text-lg max-lg:text-xl ">Help Center</h2>
                  </div>
                  <HelpCenter />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
