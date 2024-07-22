import { BsTrash3 } from "react-icons/bs";
import { useEffect, useState } from "react";
import { domain } from "../api/client";
import { jobs_info } from "../utils/interface";
import { JwtPayload, jwtDecode } from "jwt-decode";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { animate_details } from "../utils/animateContent";
import { MdOutlineSavedSearch } from "react-icons/md";

function SavedJob({
  animate,
}: {
  animate: React.MutableRefObject<HTMLDivElement[]>;
}) {
  const direct = useNavigate();
  const [saveJobs, setSavedJobs] = useState<jobs_info[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  interface newJwtPayLoad extends JwtPayload {
    _id: string;
    email: string;
  }

  const token = localStorage.getItem("AccessToken");
  const decoded: newJwtPayLoad = jwtDecode(token!);

  async function ReadSavedJobs() {
    // try {
    setIsLoading(true);
    const request = await fetch(`${domain}/api/read-jobs/${decoded._id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
    });

    if (request.ok) {
      setTimeout(async () => {
        const jobFeed = await request.json();
        setSavedJobs([...jobFeed]);
        setIsLoading(false);
      }, 4000);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        direct("/login");
      }
    }
  }

  async function RemoveSavedJob(i: number) {
    const request = await fetch(`${domain}/api/remove-jobs/${decoded._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(saveJobs[i]),
    });

    if (request.ok) {
      const jobFeed = await request.json();
      setSavedJobs(jobFeed);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        direct("/login");
      }
      console.log(result);
    }
  }

  function apply(ele: jobs_info) {
    const domain = ["https", "http"];
    const ext = ele.RecieveApplicant.split(":")[0];
    if (ele.RecieveApplicant.includes("@gmail.com")) {
      direct("/apply-job", { state: ele });
    } else if (domain.includes(ext)) {
      console.log("url");
      window.location.href = ele.RecieveApplicant;
    } else {
      console.log(ext);
    }
  }

  useEffect(() => {
    ReadSavedJobs();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          {animate_details.map(() => (
            <div className="w-full h-auto p-4  rounded-xl bg-zinc-50 space-y-2 animate-pulse">
              <div className="flex flex-col font-normal  gap-2  ">
                <h2 className=" rounded-md w-full h-3 bg-zinc-200"> </h2>
                <span className="rounded-md w-48 h-3 bg-zinc-200"></span>
                <span className="rounded-md w-40 h-3 bg-zinc-200"></span>
                <span className="rounded-md w-32 h-3 bg-zinc-200"></span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {saveJobs.length > 0 ? (
            <div className="flex flex-col gap-3 py-2 max-lg:py-3">
              {saveJobs.map((jobs, index) => (
                <div
                  className="flex gap-3 justify-between bg-zinc-50 p-5 rounded-lg"
                  key={index}
                  ref={(element: HTMLDivElement) => {
                    animate.current[index] = element;
                  }}
                >
                  <div className="flex flex-col font-normal ">
                    <h2 className="text-blue-700 font-semibold text-base">
                      {jobs.JobTitle}
                    </h2>
                    <span className="text-xs">{jobs.Company}</span>
                    <span className="text-xs">{jobs.JobLocation}</span>
                    <span className="text-xs py-1">Saved today</span>
                  </div>
                  <div className="space-y-4 text-xl flex justify-center flex-col items-center">
                    <Button
                      btn_text="Apply"
                      additionalclass=""
                      handleClick={() => apply(jobs)}
                    />
                    <div onClick={() => RemoveSavedJob(index)}>
                      <BsTrash3 />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full  h-80 flex flex-col justify-center items-center">
              <MdOutlineSavedSearch className="text-[100px] text-blue-700/80" />
              <p className="text-lg font-semibold text-zinc-400">
                No saved item yet
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SavedJob;
