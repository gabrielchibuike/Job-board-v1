import { CgClose } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import Button from "../Reuseables/Button";
import CustomInput from "../authComponent/authReuseable/CustomInput";
import { InputsTypes2 } from "../utils/interface";
import { useEffect, useRef, useState } from "react";

function ForthFormPage({
  handleClick,
  handleStepBackward,
  setJobType,
  handleInput,
  Inputs,
  Skills,
  setSkills,
  selectItemRef,
}: {
  handleClick: () => void;
  handleStepBackward: () => void;
  JobType: string;
  setJobType: React.Dispatch<React.SetStateAction<string>>;
  handleInput: any;
  Inputs: InputsTypes2;
  Skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  selectItemRef: React.MutableRefObject<HTMLDivElement[]>;
}) {
  const [inputErr, setInputErr] = useState<string>("");
  const InputRef = useRef<HTMLInputElement>(null);
  const job_type = [
    {
      job_type_title: "Full-time",
    },
    {
      job_type_title: "Part-time",
    },
    {
      job_type_title: "Permanent",
    },
    {
      job_type_title: "Temporary",
    },
    {
      job_type_title: "Contract",
    },
    {
      job_type_title: "Internship",
    },
  ];

  function selectItem(ele: string, index: number) {
    selectItemRef.current.forEach((e) => {
      e.classList.replace("bg-blue-700", "border");
      e.classList.replace("text-white", "text-black");
    });
    selectItemRef.current[index].classList.replace("border", "bg-blue-700");
    selectItemRef.current[index].classList.add("text-white");
    setJobType(ele);
  }

  function addSkill(index: any) {
    if (Inputs.Skills == "") {
      setInputErr("This field should not be empty");
      setTimeout(() => {
        setInputErr("");
      }, 4000);
    } else {
      setSkills((prev) => {
        return [...prev, Inputs.Skills as unknown as string];
      });
    }

    if (Skills.length == 10) {
      const FilteredDesiredJobs = Skills.filter((_, i) => i != index);
      setSkills(FilteredDesiredJobs);
      //  setToast(true);
    }
  }

  function removeDesiredJob(ele: string) {
    const FilteredDesiredJobs = Skills.filter((element) => element != ele);
    setSkills(FilteredDesiredJobs);
  }

  useEffect(() => {
    InputRef.current!.value = "";
    Inputs.Skills ="";
  }, [Skills]);
  return (
    <>
      <div className="w-full h-screen flex justify-center  py-14 max-lg:h-auto max-lg:px-3">
        <div className="w-full max-w-[570px] rounded-xl  max-lg:bg-transparent py-3 px-5 max-lg:px-0">
          <img src="job_type.png" alt="" />
          <div className="space-y-5">
            <div>
              <div className="text-sm font-medium py-4">Job type</div>
              <div className="w-full flex flex-wrap gap-2 cursor-pointer">
                {/* <div className="" key={index}> */}
                {job_type.map((ele, index) => (
                  <div
                    className="w-auto p-1 font-medium  rounded-full flex gap-[2px] items-center text-xs border border-zinc-400"
                    onClick={() => selectItem(ele.job_type_title, index)}
                    ref={(e: HTMLDivElement) => {
                      selectItemRef.current[index] = e;
                    }}
                  >
                    <IoMdAdd />
                    <p>{ele.job_type_title}</p>
                  </div>
                ))}
                {/* </div> */}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium py-2">Skills</div>
              <p className="text-xs font-normal">
                Add skill keyword(max 10) to make your job more visible to the
                right candidate.
              </p>
              <div className="w-full flex flex-wrap gap-2 cursor-pointer py-3">
                {Skills.map((ele, index) => (
                  <div className="" key={index}>
                    <div
                      className="w-auto font-medium py-1 px-2 rounded-full flex gap-[2px] items-center  text-xs bg-blue-700/80"
                      onClick={() => selectItem(ele, index)}
                      ref={(e: HTMLDivElement) => {
                        selectItemRef.current[index] = e;
                      }}
                    >
                      <div onClick={() => removeDesiredJob(ele)}>
                        <CgClose className="text-lg text-white" />
                      </div>
                      <p className="text-white">{ele}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full flex items-cente justify-between gap-4">
                <CustomInput
                  placeholder="eg.python, Golang"
                  label=""
                  name={"Skills"}
                  handleInput={handleInput}
                  additionalclass="w-auto font-meduim"
                  InputRef={InputRef}
                  inputErr={inputErr}
                />
                <div
                  className="w-20 h-10 text-center p-2 mt-[2px]  rounded-md text-white text-sm font-semibold cursor-pointer  bg-blue-700"
                  onClick={(i) => addSkill(i)}
                >
                  Add
                </div>
              </div>
            </div>
            <div className="w-full py-3 flex justify-between gap-5">
              <Button
                btn_text="Back"
                additionalclass="w-[200px] bg-transparent border border-blue-700 max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg !text-blue-700"
                handleClick={handleStepBackward}
              />

              <Button
                btn_text="Continue"
                additionalclass="w-[200px]  max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg"
                handleClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForthFormPage;
