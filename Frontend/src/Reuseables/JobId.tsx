import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { domain } from "../api/client";
import { jobs_info } from "../utils/interface";
import { BsFillBookmarkFill } from "react-icons/bs";
import Button from "./Button";
import { MdAddLocation } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import JobIdSkeleton from "../SkeletonLoaders/JobIdSkeleton";
import Nav from "../Components/Nav";

import { saveJob } from "../utils/saveJobFunc";
import SideNav from "../Components/SideNav";
import DOMPurify from "dompurify";
import ToastMsg from "./ToastMsg";
import Footer from "../Components/Footer";

function JobId() {
  const { id } = useParams();
  const [Toast, setToast] = useState(false);
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [JobId, setJobId] = useState<jobs_info[]>([]);
  const direct = useNavigate();

  async function LoadJobFeedId() {
    setIsLoading(true);
    const request = await fetch(`${domain}/api/allJobs/${id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
    });
    if (request.ok) {
      setTimeout(async () => {
        setIsLoading(false);
        const jobFeedId = await request.json();
        setJobId([...jobFeedId]);
      }, 2000);
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
    LoadJobFeedId();
  }, []);
  return (
    <>
      {Toast && (
        <div className="w-full fixed z-20 top-5 max-w-[250px]  left-1/2 -translate-x-1/2">
          <ToastMsg
            setToast={setToast}
            Toast={Toast}
            toastType={errType.type}
            toastMsg={errType.msg}
          />
        </div>
      )}
      <div>
        <Nav />
        <SideNav />
        {isLoading ? (
          <JobIdSkeleton />
        ) : (
          <div className=" w-full h-auto rounded-2xl z-50">
            {JobId!.map((jobs_id, index) => (
              <div key={index}>
                <div className="space-y-2 font-medium border-b border-zinc-300  p-3">
                  <div className="font-bold text-xl text-blue-700">
                    {jobs_id.JobTitle}
                  </div>
                  <div className="flex gap-5 text-sm items-center">
                    <div className="flex items-center gap-1">
                      <CiLocationArrow1 className="text-blue-700 font-semibold" />
                      <h3 className="text-zinc-600">{jobs_id.Company}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdAddLocation className="text-blue-700" />
                      <h4 className="text-zinc-600">{jobs_id.JobLocation}</h4>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-1 text-xs">
                    <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl ">
                      {`${jobs_id.Currency}  ${jobs_id.Minimum} - ${jobs_id.Maximum}  ${jobs_id.Duration}`}
                    </h4>
                    <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl">
                      {jobs_id.JobType}
                    </h4>
                  </div>
                  <div className="w-36 flex items-center gap-5">
                    <Button
                      btn_text="Apply"
                      additionalclass="w-[600px]"
                      handleClick={() => apply(jobs_id)}
                    />
                    <div
                      className="p-[6px] w-auto h-auto bg-zinc-100 rounded-md cursor-pointer"
                      onClick={() => saveJob(jobs_id, setToast, setErrType)}
                    >
                      <BsFillBookmarkFill className="text-xl text-zinc-400" />
                    </div>
                  </div>
                </div>
                <div className="py-4 px-4 overflow-y-scroll h-90">
                  <h2 className="font-semibold text-zinc-800">Description</h2>
                  <p
                    className="text-zinc-500 text-sm pt-2  line-clamp-5 "
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        jobs_id.Description as unknown as string
                      ),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default JobId;
