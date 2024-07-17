import { BsTrash3 } from "react-icons/bs";
import Button from "./Button";
import { useEffect, useState } from "react";
import { domain } from "../api/client";
import { useNavigate } from "react-router-dom";
import { jobs_info } from "../utils/interface";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { animate_details } from "../utils/animateContent";

function AppliedJob({
  animate,
}: {
  animate: React.MutableRefObject<HTMLDivElement[]>;
}) {
  const direct = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState<jobs_info[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  interface newJwtPayLoad extends JwtPayload {
    id: string;
    email: string;
  }

  const token = localStorage.getItem("AccessToken");
  const decoded: newJwtPayLoad = jwtDecode(token!);

  async function ReadAppliedJobs() {
    setIsLoading(true);
    const request = await fetch(`${domain}/api/applied-jobs/${decoded.email}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
    });

    if (request.ok) {
      setTimeout(async () => {
        const jobFeed = await request.json();
        setAppliedJobs([...jobFeed]);
        setIsLoading(false);
      }, 4000);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        direct("/login");
      }
      console.log(result);
    }
  }

  // async function RemoveSavedJob(id: string, i: number) {
  //   const request = await fetch(`${domain}/api/remove-jobs/${decoded.id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-auth-token": localStorage.getItem("AccessToken") as string,
  //     },
  //     body: JSON.stringify(saveJobs[i]),
  //   });

  //   if (request.ok) {
  //     const jobFeed = await request.json();
  //     setSetSavedJobs(jobFeed);
  //   } else {
  //     const result = await request.text();
  //     if (result == "Forbidden") {
  //       direct("/login");
  //     }
  //     console.log(result);
  //   }
  // }

  useEffect(() => {
    ReadAppliedJobs();
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
          <div className="flex flex-col gap-3 py-2 max-lg:py-3">
            {appliedJobs.map((jobs, index) => (
              <div
                className="flex gap-3 justify-between bg-zinc-50 p-3 rounded-lg"
                key={index}
              >
                {/* <div className="w-10 h-5 bg-zinc-400 rounded-sm p-3"></div> */}
                <div className="flex flex-col text-sm font-normal">
                  <h2 className="text-blue-700 font-semibold text-base">
                    {jobs.JobTitle}
                  </h2>
                  <span className="text-xs">{jobs.Company}</span>
                  <span className="text-xs">{jobs.JobLocation}</span>
                  <span className="text-xs py-1">Applied today</span>
                </div>
                <div className="space-y-4 text-xl flex  flex-col items-center">
                  <p className="text-xs">{jobs.Status}</p>
                  {/* <div onClick={() => RemoveSavedJob(jobs._id, index)}>
                    <BsTrash3 />
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AppliedJob;
