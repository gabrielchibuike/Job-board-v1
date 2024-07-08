import CustomInput from "../../authComponent/authReuseable/CustomInput";
import Button from "../Button";
import { InputsTypes } from "../../utils/interface";

function Step1({
  handleClick,
  handleInputs,
  Inputs,
}: {
  handleClick: () => void;
  handleInputs: any;
  Inputs: InputsTypes;
}) {


  return (
    <>
        <div>
          <h3 className="font-semibold text-xl">What's your full name ?</h3>
          <div className="space-y-2 py-3">
            <CustomInput
              placeholder="FirstName"
              label="FirstName"
              value={Inputs.firstName}
              name={"firstName"}
              handleInput={handleInputs}
            />
            <CustomInput
              placeholder="LastName"
              label="LastName"
              value={Inputs.lastName}
              name={"lastName"}
              handleInput={handleInputs}
            />
            <div className="py-3">
              <Button btn_text="Continue" handleClick={handleClick} />
            </div>
          </div>
        </div>
    </>
  );
}

export default Step1;
