import { BsTrash3 } from "react-icons/bs";
import Button from "./Button";
import { useEffect, useState } from "react";
import { domain } from "../api/client";
import { useNavigate } from "react-router-dom";
import { jobs_info } from "../utils/interface";
import { JwtPayload, jwtDecode } from "jwt-decode";

function AppliedJob() {
  const direct = useNavigate();
  const [saveJobs, setSetSavedJobs] = useState<jobs_info[]>([]);
  interface newJwtPayLoad extends JwtPayload {
    id: string;
    email: string;
  }

  const token = localStorage.getItem("AccessToken");
  const decoded: newJwtPayLoad = jwtDecode(token!);

  async function ReadSavedJobs() {
    const request = await fetch(`${domain}/api/read-jobs/${decoded.id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
    });

    if (request.ok) {
      const jobFeed = await request.json();
      setSetSavedJobs([...jobFeed]);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        direct("/login");
      }
      console.log(result);
    }
  }

  async function RemoveSavedJob(id: string, i: number) {
    const request = await fetch(`${domain}/api/remove-jobs/${decoded.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(saveJobs[i]),
    });

    if (request.ok) {
      const jobFeed = await request.json();
      setSetSavedJobs(jobFeed);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        direct("/login");
      }
      console.log(result);
    }
  }

  useEffect(() => {
    ReadSavedJobs();
  }, []);
  return (
    <>
      <div>
        <div className="flex flex-col gap-3 py-2 max-lg:py-3">
          {saveJobs.map((jobs, index) => (
            <div
              className="flex gap-3 justify-between bg-zinc-100 p-3 rounded-lg"
              key={index}
            >
              {/* <div className="w-10 h-5 bg-zinc-400 rounded-sm p-3"></div> */}
              <div className="flex flex-col text-sm font-normal">
                <h2 className="text-blue-700 font-semibold text-base">
                  {jobs.Job_Title}
                </h2>
                <span>{jobs.Company_Name}</span>
                <span>{jobs.State}</span>
                <span className="text-xs py-1">Saved today</span>
              </div>
              <div className="space-y-4 text-xl flex justify-center flex-col items-center">
                <Button
                  btn_text="Apply"
                  additionalclass=""
                  // handleClick={apply}
                />
                <div onClick={() => RemoveSavedJob(jobs._id, index)}>
                  <BsTrash3 />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AppliedJob;
