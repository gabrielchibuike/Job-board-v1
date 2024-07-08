import React from "react";
import Button from "../../Reuseables/Button";
import CustomInput from "./CustomInput";
import { InputsTypes } from "../../utils/interface";

function AuthStep3({
  handleClick,
  handleInput,
  Inputs,
}: {
  handleClick: () => void;
  handleInput: any;
  Inputs: InputsTypes;
}) {
  return (
    <>
      <>
        <div className="w-full h-screen max-lg:h-auto flex justify-center items-center py-14">
          <div className="w-full max-w-[570px]  rounded-xl  bg-[#f5f5f594] max-lg:bg-transparent py-3 px-5 max-lg:px-0">
            <h3 className="font-semibold text-xl">What's your location ?</h3>
            <p className="text-sm font-medium py-2 text-zinc-600">
              We use this to match you with job nearby.
            </p>
            <div className="space-y-5">
              <CustomInput
                placeholder="City,State"
                label="City,State"
                value={Inputs.state}
                name={"state"}
                handleInput={handleInput}
              />
              <CustomInput
                placeholder="PostalCode"
                label="PostalCode"
                value={Inputs.postal_code}
                name={"postal_code"}
                handleInput={handleInput}
              />
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
    </>
  );
}

export default AuthStep3;
