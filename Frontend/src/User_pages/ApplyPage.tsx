import { BiCloudUpload, BiLoaderAlt } from "react-icons/bi";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdAddLocation } from "react-icons/md";
import Button from "../Reuseables/Button";
import CustomInput from "../authComponent/authReuseable/CustomInput";
import { InputsTypes } from "../utils/interface";
import { domain } from "../api/client";
import SideNav from "../Components/SideNav";
import ToastMsg from "../Reuseables/ToastMsg";
import DOMPurify from "dompurify";

function ApplyPage() {
  const [selectedFile, setSelectedFile] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const disabledBtn = useRef<HTMLButtonElement>(null);
  const styleInput = useRef<HTMLInputElement>(null);
  const [isOverView, setIsOverView] = useState(false);
  const [isViewApplication, setIsViewApplication] = useState(false);
  const [Records, setRecords] = useState<InputsTypes>({});
  const [unsupportedFormat, setUnsupportedFormat] = useState(false);
  const [Toast, setToast] = useState(false);
  const direct = useNavigate();
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });
  const [Inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    Email: "",
    City: "",
  });

  const data = useLocation();
  const arr: any[] = [];
  arr.push(data.state);
  // console.log(data.state);

  function viewDetails() {
    setIsOverView(true);
    setIsViewApplication(false);
  }
  function viewApplication() {
    setIsViewApplication(true);
    setIsOverView(false);
  }

  useEffect(() => {
    setIsOverView(true);
    setIsViewApplication(false);
  }, []);

  function handleSelectClickk() {
    styleInput.current?.click();
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  }

  async function handleClick(Records: InputsTypes) {
    if (
      Inputs.firstName == "" ||
      Inputs.lastName == "" ||
      Inputs.Email == "" ||
      Inputs.City == "" ||
      selectedFile == ""
    ) {
      setToast(true);
      setErrType({ type: "error", msg: "Fields must mot be empty" });
    } else {
      const data = {
        ...Records,
      };

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("jsonData", JSON.stringify(data));

      const option = {
        method: "POST",
        headers: {
          "x-auth-token": localStorage.getItem("AccessToken") as string,
        },
        body: formData,
      };
      setIsLoading(true);
      disabledBtn.current!.disabled = true;

      const request = await fetch(`${domain}/api/apply`, option);
      console.log(request);

      if (request.ok) {
        setIsLoading(false);
        disabledBtn.current!.disabled = false;
        const result = await request.text();
        if (request.status == 409) {
          setToast(true);
          setErrType({ type: "error", msg: result as string });
        }
        setToast(true);
        setErrType({ type: "success", msg: result as string });
        setTimeout(() => {
          direct("/jobs");
        }, 5000);
      } else if (request.status == 403) {
        disabledBtn.current!.disabled = false;
        setIsLoading(false);
        direct("/login");
      } else {
        disabledBtn.current!.disabled = false;
        setIsLoading(false);
        const result = await request.text();
        setToast(true);
        setErrType({ type: "error", msg: result as string });
        console.log(result);
      }
    }
  }

  // async function submitApplication(Records: InputsTypes) {
  //   const data = {
  //     ...Records,
  //   };

  //   const formData = new FormData();
  //   formData.append("file", selectedFile);
  //   formData.append("jsonData", JSON.stringify(data));

  //   const option = {
  //     method: "POST",
  //     headers: {
  //       "x-auth-token": localStorage.getItem("AccessToken") as string,
  //     },
  //     body: formData,
  //   };
  //   // setIsLoading(true);
  //   const request = await fetch(`${domain}/api/apply`, option);
  //   console.log(request);

  //   if (request.ok) {
  //     // setIsLoading(false);
  //     const result = await request.text();
  //     if (request.status == 409) {
  //       setToast(true);
  //       setErrType({ type: "error", msg: result as string });
  //     }
  //     setToast(true);
  //     setErrType({ type: "success", msg: result as string });
  //     setTimeout(() => {
  //       direct("/jobs");
  //     }, 5000);
  //   } else if (request.status == 403) {
  //     direct("/login");
  //   } else {
  //     const result = await request.text();
  //     setToast(true);
  //     setErrType({ type: "error", msg: result as string });
  //     console.log(result);
  //   }
  // }

  useEffect(() => {
    if (selectedFile) {
      if (selectedFile.name.split(".")[1] !== "pdf") {
        setUnsupportedFormat(true);
        setSelectedFile("");
      } else {
        setUnsupportedFormat(false);
      }
    }
    setRecords({
      id: arr[0]._id,
      reciever: arr[0].RecieveApplicant,
      firstName: Inputs.firstName,
      lastName: Inputs.lastName,
      email: Inputs.Email,
      city: Inputs.City,
      status: "pending",
    });
  }, [selectedFile]);

  // useEffect(() => {
  //   submitApplication();
  // }, [Records]);

  return (
    <>
      <Nav />
      <SideNav />
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
      <div className="w-full">
        <div className=" pt-7">
          <div className="flex">
            {arr!.map((jobs_id, index) => (
              <div className="w-full px-[400px] max-lg:px-1" key={index}>
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
                <div className="w-full  flex justify-center gap-5 text-sm font-semibold text-zinc-500 p-6 cursor-pointer">
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
                    PROCEED TO APPLICATION
                  </div>
                </div>
                {isOverView && (
                  <div className="py-4 px-4 overflow-y-scroll h-90 text-cente">
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
                )}

                <div className="w-full flex flex-col items-center">
                  {isViewApplication && (
                    <div className="w-full py-4 px-4">
                      <div className="space-y-5">
                        <CustomInput
                          label="First name"
                          value={Inputs.firstName}
                          name={"firstName"}
                          handleInput={handleInput}
                        />
                        <CustomInput
                          label="Last name"
                          value={Inputs.lastName}
                          name={"lastName"}
                          handleInput={handleInput}
                        />

                        <CustomInput
                          label="Email"
                          value={Inputs.Email}
                          name={"Email"}
                          handleInput={handleInput}
                        />

                        <CustomInput
                          label="City"
                          value={Inputs.City}
                          name={"City"}
                          handleInput={handleInput}
                        />

                        <div>
                          <div className="text-xs font-medium">Resume</div>
                          <div className="p-4 border border-dashed border-blue-700 flex justify-center flex-col items-center mt-1 cursor-pointer">
                            <input
                              type="file"
                              className="hidden"
                              ref={styleInput}
                              onChange={async (
                                e: ChangeEvent<HTMLInputElement>
                              ) => {
                                setSelectedFile(e.target.files![0]);
                              }}
                            />
                            <div
                              className="w-10 h-10 p-1  bg-blue-200/50 rounded-full flex justify-center items-center"
                              onClick={handleSelectClickk}
                            >
                              <BiCloudUpload className="text-2xl text-blue-700" />
                            </div>
                            <p className="text-xs text-zinc-600 text-center">
                              Import your resume in one of the following format
                              : .pdf, .docx, .doc, or .rtf
                            </p>
                          </div>
                          <div className="w-fit">
                            {unsupportedFormat == true ? (
                              <div className="text-red-700 font-medium text-xs">
                                Pdf file only
                              </div>
                            ) : (
                              <p className="text-xs mt-3 p-1 font-medium rounded-full bg-blue-200">
                                {selectedFile && selectedFile.name}
                              </p>
                            )}
                          </div>
                        </div>

                        <Button
                          btn_text={
                            isLoading ? (
                              <div className="animate-spin w-full flex justify-center  text-2xl">
                                <BiLoaderAlt className="text-white" />
                              </div>
                            ) : (
                              "Submit application"
                            )
                          }
                          additionalclass="w-full  max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg"
                          handleClick={() => handleClick(Records)}
                          disabled={disabledBtn}
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
  );
}

export default ApplyPage;
