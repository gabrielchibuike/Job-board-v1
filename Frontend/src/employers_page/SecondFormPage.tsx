import { ChangeEvent, useEffect, useState } from "react";
import Button from "../Reuseables/Button";
import CustomInput from "../authComponent/authReuseable/CustomInput";
import { InputsTypes, InputsTypes2 } from "../utils/interface";

function SecondFormPage({
  handleClick,
  handleStepBackward,
  handleInput,
  Inputs,
  setInputs,
}: {
  handleClick: () => void;
  handleStepBackward: ()=> void;
  handleInput: any;
  Inputs: InputsTypes2;
  setInputs: any;
}) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  }

 
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center py-14 max-lg:h-auto max-lg:px-3 ">
        <div className="w-full max-w-[570px] rounded-xl   max-lg:bg-transparent py-3 px-5 max-lg:px-0">
          <img src="job basics.png" alt="" />
          <div className="space-y-5">
            <CustomInput
              placeholder="Add the title you are hiring for"
              label="Job title"
              value={Inputs.JobTitle}
              name={"JobTitle"}
              handleInput={handleInput}
            />
            <CustomInput
              placeholder="Company"
              label="Company"
              value={Inputs.Company}
              name={"Company"}
              handleInput={handleInput}
            />

            <div className="w-full">
              <label className="text-xs font-medium">Workplace type</label>
              <select
                onChange={handleChange}
                name="WorkPlaceType"
                className="w-full py-3 px-2 outline-0 rounded-lg text-sm bg-[#80808011] focus:border focus:border-blue-700"
              >
                <option value={""}> select</option>
                <option value={Inputs.onsite}> onsite</option>
                <option value={Inputs.Remote}> Remote</option>
                <option value={Inputs.Hybrid}> Hybrid</option>
              </select>
            </div>

            <CustomInput
              placeholder="Enter location"
              label="Where would you like to advertise this job?"
              value={Inputs.JobLocation}
              name={"JobLocation"}
              handleInput={handleInput}
            />

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

export default SecondFormPage;
