import  { ChangeEvent, useEffect, useState } from "react";
import Step1 from "./ResumeFormComponent/Step1";
import Step2 from "./ResumeFormComponent/Step2";
import Step3 from "./ResumeFormComponent/Step3";
import Step from "./ResumeFormComponent/Step";
import { InputsTypes } from "../utils/interface";

function ResumeComponent() {
  const [Inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    streetAddress: "",
    state: "",
    postalCode: "",
  });

  const [Records, setRecords] = useState<InputsTypes>({});
  const [step, setSteps] = useState<number>(0);

  function handleInputs(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
    console.log(Inputs);
  }

  function BuildResume() {
    setSteps(1);
  }

  function handleClick(index: number) {
    if (index == 1) {
      setRecords((previnfo) => {
        return {
          ...previnfo,
          firstName: Inputs.firstName,
          lastName: Inputs.lastName,
        };
      });
      setSteps(2);
    } else if (index == 2) {
      setRecords((previnfo) => {
        return { ...previnfo, phoneNumber: Inputs.phoneNumber };
      });
      setSteps(3);
    } else if (index == 3) {
      setRecords((previnfo) => {
        return {
          ...previnfo,
          streetAddress: Inputs.streetAddress,
          state: Inputs.state,
          postalCode: Inputs.postalCode,
        };
      });
    }
  }
  useEffect(() => {
    console.log(Records);
  }, [Records]);
  return (
    <>
      <div className="w-full  py-10 flex justify-center items-center">
        <div className="w-full max-w-[470px] min-h-[180px] rounded-xl  bg-[#f5f5f594] p-3 px-5">
          {step == 1 ? (
            <Step1
              handleClick={() => handleClick(1)}
              handleInputs={handleInputs}
              Inputs={Inputs}
            />
          ) : step == 2 ? (
            <Step2
              handleClick={() => handleClick(2)}
              handleInputs={handleInputs}
              Inputs={Inputs}
            />
          ) : step == 3 ? (
            <Step3
              handleClick={() => handleClick(3)}
              handleInputs={handleInputs}
              Inputs={Inputs}
            />
          ) : (
            <Step handleClick={BuildResume} />
          )}
        </div>
      </div>
    </>
  );
}

export default ResumeComponent;
