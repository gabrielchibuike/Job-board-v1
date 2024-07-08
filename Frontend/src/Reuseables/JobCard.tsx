import { MdAddLocation } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import { useEffect, useState } from "react";
import { domain } from "../api/client";
import { Link, useNavigate } from "react-router-dom";
import { jobs_info } from "../utils/interface";
import JobCardSkeleton from "../SkeletonLoaders/JobCardSkeleton";
import DOMPurify from "dompurify";

function Card({
  handleClick,
  activeCard,
  jobs_info,
  setJobs_info,
}: {
  handleClick: any;
  activeCard: any;
  jobs_info: jobs_info[];
  setJobs_info: React.Dispatch<React.SetStateAction<jobs_info[]>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  async function LoadJobFeed() {
    setIsLoading(true);

    const request = await fetch(`${domain}/api/allJobs`, {
      headers: {
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
    });

    if (request.ok) {
      setTimeout(async () => {
        setIsLoading(false);
        const jobFeed = await request.json();
        setJobs_info([...jobFeed]);
      }, 2000);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        nav("/login");
      }
    }
  }

  useEffect(() => {
    LoadJobFeed();
  }, []);

  return (
    <>
      {isLoading ? (
        <JobCardSkeleton />
      ) : (
        jobs_info.map((info: jobs_info, index: number) => (
          <div
            className="p-5 shadow-zinc-400 bg-[#f5f5f53d] shadow h-auto w-full rounded-2xl cursor-pointer hover:shadow-blue-700"
            key={index}
            onClick={() => handleClick(info, index)}
            ref={(element: HTMLDivElement) => {
              activeCard.current[index] = element;
            }}
          >
            <Link
              to={
                innerWidth > 1025
                  ? "#"
                  : innerWidth < 1023
                  ? `/job-id/${info._id}`
                  : ""
              }
            >
              <div className="space-y-2 font-medium">
                <h1 className="font-bold text-xl text-blue-600">
                  {" "}
                  {info.JobTitle}
                </h1>
                <div className="flex gap-3 text-sm items-center">
                  <div className="flex items-center gap-1">
                    <CiLocationArrow1 className="text-blue-700 font-semibold" />
                    <h3 className="">{info.Company}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <MdAddLocation className="text-blue-700" />
                    <h4>{info.JobLocation}</h4>
                  </div>
                </div>
                <div className="flex gap-3 pt-1 text-xs">
                  <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl ">
                    {`${info.Currency}  ${info.Minimum} - ${info.Maximum}  ${info.Duration}`}
                  </h4>
                  <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl">
                    {info.JobType}
                  </h4>
                </div>
                <p
                  className="text-zinc-500 text-sm pt-2  line-clamp-5 "
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      info.Description as unknown as string
                    ),
                  }}
                />
                <span className=" text-sm text-blue-700  pt-2">
                  {/* {info.} */}
                </span>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  );
}


export default Card;
