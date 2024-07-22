import  { useEffect, useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdAddLocation } from "react-icons/md";
import {  useSearchParams } from "react-router-dom";
import { domain } from "../api/client";
import Button from "../Reuseables/Button";
import Footer from "../Components/Footer";
import SideNav from "../Components/SideNav";
import Nav from "../Components/Nav";
import { jobs_info } from "./interface";
import { BiCloudUpload } from "react-icons/bi";
import { downloadFile } from "./dowmloadFunc";
import DOMPurify from "dompurify";

function EmailTemplate() {
  const [isOverView, setIsOverView] = useState(false);
  const [isViewApplication, setIsViewApplication] = useState(false);
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState<any>([]);
  const [downloadSrc, setDownloadSrc] = useState<any>([]);

  function viewDetails() {
    setIsOverView(true);
    setIsViewApplication(false);
  }
  function viewApplication() {
    setIsViewApplication(true);
    setIsOverView(false);
  }

  async function reviewApplication() {
    const JobDetails = searchParams.get("id") as string;
    const request = await fetch(
      `${domain}/api/review-application/${JobDetails}`,
      {
        headers: {
          "x-auth-token": localStorage.getItem("AccessToken") as string,
        },
      }
    );

    if (request.ok) {
      const jobFeed = await request.json();
      setDetails([jobFeed]);
      // setDownloadSrc([...jobFeed]);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        // direct("/");
      }
      console.log(result);
    }
  }

  async function fetchApplication() {
    const JobDetails = searchParams.get("id") as string;
    const request = await fetch(`${domain}/api/get-application/${JobDetails}`, {
      headers: {
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
    });

    if (request.ok) {
      const jobFeed = await request.json();
      console.log(jobFeed);
      setDownloadSrc([jobFeed]);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        // direct("/");
      }
      console.log(result);
    }
  }

  async function acceptApplication() {
    const data = {
      sender_email: downloadSrc[0].email,
      reciver_email: downloadSrc[0].reciever,
    };
    console.log(data);

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(data),
    };

    const request = await fetch(`${domain}/api/accept-application`, option);

    if (request.ok) {
      const jobFeed = await request.text();
      console.log(jobFeed);
      // setDownloadSrc([jobFeed]);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        // direct("/");
      }
      console.log(result);
    }
  }

  async function declineApplication() {
   const data = {
     sender_email: downloadSrc[0].email,
     reciver_email: downloadSrc[0].reciever,
   };
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(data),
    };

    const request = await fetch(`${domain}/api/decline-application`, option);

    if (request.ok) {
      const jobFeed = await request.text();
      console.log(jobFeed);
      // setDownloadSrc([jobFeed]);
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        // direct("/");
      }
      console.log(result);
    }
  }

  function handleDownload() {}

  useEffect(() => {
    setIsOverView(true);
    setIsViewApplication(false);
    reviewApplication();
    fetchApplication();
  }, []);
  return (
    <>
      <>
        <Nav />
        <SideNav />
        <div className="w-full">
          <div className=" pt-7">
            <div className="flex">
              {details!.map((jobs_id: jobs_info, index: number) => (
                <div className="w-full px-[400px] max-lg:px-3" key={index}>
                  <div className="space-y-2 font-medium  flex justify-center flex-col items-center">
                    <div className="font-bold text-xl text-blue-700">
                      {jobs_id.JobTitle}
                    </div>
                    <div className="flex gap-3 pt-1 text-xs">
                      <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl ">
                        {`${jobs_id.Currency}  ${jobs_id.Minimum} - ${jobs_id.Maximum}  ${jobs_id.Duration}`}
                      </h4>
                      <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl">
                        {jobs_id.JobType}
                      </h4>
                    </div>
                    <div className="flex gap-5 text-sm items-center">
                      <div className="flex items-center gap-1">
                        <CiLocationArrow1 className="text-blue-700 font-semibold" />
                        <h3 className="text-zinc-600">{jobs_id.Company}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdAddLocation className="text-blue-700" />
                        <h4 className="text-zinc-600">{jobs_id.JobType}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center gap-5 text-sm font-semibold text-zinc-500 p-6 cursor-pointer">
                    <div
                      className={
                        isOverView
                          ? "border-b-2 border-blue-700 text-blue-700"
                          : ""
                      }
                      onClick={viewDetails}
                    >
                      OVERVIEW
                    </div>
                    <div
                      className={
                        isViewApplication
                          ? "border-b-2 border-blue-700 text-blue-700"
                          : " "
                      }
                      onClick={viewApplication}
                    >
                      REVIEW APPLICATION
                    </div>
                  </div>
                  {isOverView && (
                    <div className="py-4 px-4 overflow-y-scroll h-90 text-cente">
                      <h2 className="font-semibold text-zinc-800">
                        Description
                      </h2>
                      <p
                        className="text-zinc-500 text-sm pt-2  line-clamp-5 "
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            jobs_id.Description as unknown as string
                          ),
                        }}
                      />
                    </div>
                  )}

                  <div className="w-full ">
                    {isViewApplication && (
                      <div>
                        <div>
                          <div
                            className="p-4 border border-dashed border-blue-700 flex justify-center flex-col items-center mt-3 cursor-pointer"
                            onClick={() =>
                              downloadFile(
                                `${downloadSrc[index].resume}`,
                                `${downloadSrc[index].firstName}'s.pdf`
                              )
                            }
                          >
                            <div
                              className="w-10 h-10 p-1  bg-blue-300/50 rounded-full flex justify-center items-center"
                              onClick={handleDownload}
                            >
                              <BiCloudUpload className="text-2xl text-blue-700" />
                            </div>
                            <p className="text-xs text-zinc-600 text-center">
                              Download C.v
                            </p>
                          </div>
                        </div>
                        <div className="w-full py-3 space-y-3">
                          <Button
                            btn_text="Accept application"
                            additionalclass="w-full  max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg"
                            handleClick={acceptApplication}
                          />
                          <Button
                            btn_text="Decline application"
                            additionalclass="w-full !bg-blue-50/50 !text-blue-700/90  border border-blue-700/60  max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg"
                            handleClick={declineApplication}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    </>
  );
}

export default EmailTemplate;
