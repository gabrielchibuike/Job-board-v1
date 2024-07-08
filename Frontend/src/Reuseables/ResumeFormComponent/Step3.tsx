import CustomInput from "../../authComponent/authReuseable/CustomInput";
import Button from "../Button";
import { InputsTypes } from "../../utils/interface";

function Step3({
  handleClick,
  Inputs,
  handleInputs,
}: {
  handleClick: () => void;
  handleInputs: any;
  Inputs: InputsTypes;
}) {
  return (
    <>
        <div>
          <h3 className="font-semibold text-xl">Where are you located?</h3>
          <span className="text-sm text-zinc-500 font-medium">
            This helps match you with better jobs.
          </span>
          <div className="space-y-2 py-3">
            <CustomInput
              placeholder="Street address"
              label="Street address"
              value={Inputs.streetAddress}
              name={"streetAddress"}
              handleInput={handleInputs}
            />
            <CustomInput
              placeholder="City,State"
              label="City,State"
              value={Inputs.state}
              name={"state"}
              handleInput={handleInputs}
            />
            <CustomInput
              placeholder="Postal code"
              label="Postal code"
              value={Inputs.postalCode}
              name={"postalCode"}
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

export default Step3;
