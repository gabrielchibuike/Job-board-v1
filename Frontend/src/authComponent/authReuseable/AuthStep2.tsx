import Button from "../../Reuseables/Button";
import CustomInput from "./CustomInput";
import { InputsTypes } from "../../utils/interface";

function AuthStep2({
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
      <div className="w-full h-screen flex justify-center items-center py-14 max-lg:h-auto">
        <div className="w-full max-w-[570px] rounded-xl  bg-[#f5f5f594] max-lg:bg-transparent py-3 px-5 max-lg:px-0">
          <h3 className="font-semibold text-xl py-3">
            What's your full name ?
          </h3>
          <div className="space-y-5">
            <CustomInput
              placeholder="FirstName"
              label="FirstName"
              value={Inputs.firstName}
              name={"firstName"}
              handleInput={handleInput}
            />
            <CustomInput
              placeholder="LastName"
              label="LastName"
              value={Inputs.lastName}
              name={"lastName"}
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
  );
}

export default AuthStep2;
