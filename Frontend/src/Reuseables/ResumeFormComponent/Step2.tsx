import CustomInput from "../../authComponent/authReuseable/CustomInput";
import Button from "../Button";
import { InputsTypes } from "../../utils/interface";

function Step2({
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
          <h3 className="font-semibold text-xl">
            Would you like to add a number to your resume ?
          </h3>
          <div className="space-y-2 py-3">
            <span className="text-sm text-zinc-500 font-medium">
              Only provided to employer you apply or repond to
            </span>
            <CustomInput
              placeholder="number"
              label="Phone number"
              value={Inputs.phoneNumber}
              name={"phoneNumber"}
              handleInput={handleInputs}
            />
            <div className="py-3">
              <Button btn_text="Continue" handleClick={handleClick} />
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="" className="w-7 h-5" />
              <span className="text-sm text-zinc-600 font-medium">
                Show my number on konnect
              </span>
            </div>
            <span className="text-[12px] text-zinc-500 font-medium">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
              doloremque cumque aut ducimus necessitatibus reprehenderit! Eum,
              atque? Modi sint neque velit laborum, nobis mollitia accusamus.
              Aut sint magni rerum at!
            </span>
          </div>
        </div>
    </>
  );
}

export default Step2;
