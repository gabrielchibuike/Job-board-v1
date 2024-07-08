import { BiLeftArrowAlt } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { BiBookmark } from "react-icons/bi";
import { RefObject, useRef } from "react";
import { MdAddLocation } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import Button from "./Button";
import { jobs_info } from "../utils/interface";
import SideNav from "../Components/SideNav";
import PopUpOption from "../Components/PopUpOption";

function MobileJobCardInfo({
  jobs_info_id,
  JobFeedId,
  viewPage,
  hideJobList,
}: {
  jobs_info_id: jobs_info[];
  JobFeedId: jobs_info[];
  viewPage: RefObject<HTMLDivElement>;
  hideJobList: RefObject<HTMLDivElement>;
}) {
  const popUpOptionRef = useRef<HTMLDivElement>(null);
  function apply() {}

  function popUpOption() {
    popUpOptionRef.current!.style.display = "block";
  }

  const skill = [
    {
      skill: "TypeScript",
      skill1: " MySql",
      skill2: " Node.js",
    },
  ];

  function closeViewPage() {
    viewPage.current!.classList.remove("max-sm:block");
    viewPage.current!.classList.add("hidden");
    hideJobList.current!.classList.remove("max-lg:hidden");
    hideJobList.current!.classList.add("block");
  }

  return (
    <>
      <SideNav />
      <div className="w-full py-1 bg-[white] hidden" ref={viewPage}>
        {/* <Nav activeRoute="/jobs" /> */}
        {jobs_info_id.map((jobs_id) => (
          <div>
            <div className="w-full  px-3 py-2">
              <div className="w-full text-xl flex items-center justify-between">
                <div onClick={closeViewPage}>
                  {/* <CgClose /> */}
                  <div className="w-auto h-auto bg-[#f5f5f577] rounded-full">
                    <BiLeftArrowAlt className="text-3xl text-zinc-500" />
                  </div>
                </div>
                <div className="text-xl font-semibold text-zinc-900 ">
                  Job details
                </div>
                <div onClick={popUpOption}>
                  <div className="flex flex-col gap-1">
                    <div className="w-2 h-1 rounded-full bg-zinc-400"></div>
                    <div className="w-2 h-1 rounded-full bg-zinc-400"></div>
                    <div className="w-2 h-1 rounded-full bg-zinc-400"></div>
                  </div>

                  {/* <CiMenuKebab className="text-3xl " /> */}
                </div>
              </div>
              <div className="space-y-3 font-medium  px-1 py-3">
                <div className="font-bold text-xl text-blue-700">
                  {jobs_id.Job_Title}
                </div>
                <div className="flex gap-3 text-sm items-center">
                  <div className="flex items-center gap-1">
                    <CiLocationArrow1 className="text-blue-700 font-semibold" />
                    <h3 className="text-zinc-600">{jobs_id.Company_Name}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAddLocation className="text-blue-700" />
                    <h4 className="text-zinc-600">{jobs_id.Job_Location}</h4>
                  </div>
                </div>
                <div className="flex gap-1 ">
                  <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl text-sm">
                    {jobs_id.Salary}
                  </h4>
                  <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl text-sm">
                    {jobs_id.Job_Type}
                  </h4>
                </div>
                <div className="w-28 ">
                  <Button
                    btn_text="Apply"
                    handleClick={apply}
                    additionalclass="w-full"
                  />
                </div>
              </div>
              <span className=" text-sm text-blue-700 px-2">
                {jobs_id.Date_Posted}
              </span>
            </div>
            <div className="py-2 px-4 overflow-y-scroll h-90">
              <h2 className="text-base font-semibold">skills</h2>
              {skill.map((skill) => (
                <div className="w-full flex gap-4">
                  <p className="bg-zinc-100 p-1 px-3 text-zinc-500 rounded-3xl text-sm">
                    {skill.skill}
                  </p>
                  <p className="bg-zinc-100 p-1 px-3 text-zinc-500 rounded-3xl text-sm">
                    {skill.skill1}
                  </p>
                  <p className="bg-zinc-100 p-1 px-3 text-zinc-500 rounded-3xl text-sm">
                    {skill.skill2}
                  </p>
                </div>
              ))}
            </div>
            <div className="py-4 px-4 overflow-y-scroll h-90">
              <h2 className="text-base font-semibold">Description</h2>
              <p className="text-zinc-600  text-sm pt-2">
                {jobs_id.Description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <PopUpOption
        popUpOptionRef={popUpOptionRef}
        jobs_info_id={jobs_info_id}
      />
    </>
  );
}

export default MobileJobCardInfo;
