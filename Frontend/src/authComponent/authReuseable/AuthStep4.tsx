import { AiOutlineClose } from "react-icons/ai";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../Reuseables/Button";
import CustomInput from "./CustomInput";
import ToastMsg from "../../Reuseables/ToastMsg";
import { InputsTypes } from "../../utils/interface";

function AuthStep4({
  handleClick,
  handleInput,
  Inputs,
  desiredJob,
  setDesiredJob,
}: {
  handleClick: () => void;
  handleInput: any;
  Inputs: InputsTypes;
  desiredJob: string[];
  setDesiredJob: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  // const [desiredJob, setDesiredJob] = useState<string[]>([]);
  // const [jobInputs, setJobInputs] = useState<string>("");
  const [Toast, setToast] = useState(false);
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });

  // function handleInput(e: ChangeEvent<HTMLInputElement>) {
  //   setJobInputs(e.target.value);
  // }

  function addDesiredJob(index: any) {
    console.log(index);
    
    setDesiredJob((prev) => {
      return [...prev, Inputs.desired_jobs as string];
    });

    if (desiredJob.length == 5) {
      const FilteredDesiredJobs = desiredJob.filter((element, i) => i != index);
      setDesiredJob(FilteredDesiredJobs);
      setToast(true);
    }
  }

  function removeDesiredJob(index: number) {
    const FilteredDesiredJobs = desiredJob.filter((element, i) => i != index);
    setDesiredJob(FilteredDesiredJobs);
  }

  useEffect(() => {
    console.log(desiredJob);
  }, [desiredJob]);

  return (
    <>
      {Toast && (
        <div className="w-full fixed z-20 top-20 max-w-[250px]  left-1/2 -translate-x-1/2">
          <ToastMsg
            toastType="error"
            toastMsg="Only five(5) is required"
            setToast={setToast}
            Toast={Toast}
          />
        </div>
      )}
      <div className="w-full h-screen flex justify-center items-center py-14">
        <div className="w-full max-w-[570px]  rounded-xl  bg-[#f5f5f594] py-3 px-5 max-lg:bg-transparent  max-lg:px-0">
          <h3 className="font-semibold text-xl">
            What's job are you looking for ?
          </h3>
          <p className="text-sm font-medium  text-zinc-600 py-2">
            This help us match you with ralevant jobs.
          </p>
          <div className="space-y-2 py-3">
            <div className="w-full flex items-center justify-between gap-4">
              <CustomInput
                placeholder="eg.Software Developer"
                label="Desired job titles"
                name={"desired_jobs"}
                value={Inputs.desired_jobs}
                handleInput={handleInput}
                additionalclass="w-auto font-meduim"
              />
              <div
                className="w-20 h-10 text-center p-2 mt-6 rounded-md text-white text-sm font-semibold cursor-pointer  bg-blue-700"
                onClick={(i) => addDesiredJob(i)}
              >
                Add
              </div>
            </div>
            <div className="space-y-2 cursor-pointer">
              {desiredJob.map((desiredJob, index) => (
                <div
                  className="rounded-md w-full h-10 bg-zinc-200 px-3 py-6 flex items-center justify-between text-sm text-zinc-600 font-medium"
                  key={index}
                >
                  {desiredJob}
                  <div onClick={() => removeDesiredJob(index)}>
                    <AiOutlineClose />
                  </div>
                </div>
              ))}
            </div>
            <div className="py-3">
              <Button
                btn_text="Continue"
                additionalclass="w-full max-lg:w-full max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg"
                handleClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthStep4;
