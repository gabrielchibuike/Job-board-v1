import { ChangeEvent, useState } from "react";
import MainContainer from "../Reuseables/MainContainer";
import ToastMsg from "../Reuseables/ToastMsg";
import CustomInput from "./authReuseable/CustomInput";
import CustomButton from "../Reuseables/Button";
import { domain } from "../api/client";
import { jwtDecode } from "jwt-decode";

function EditProfile() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [state, setState] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [Toast, setToast] = useState(false);
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });

  interface jwtData {
    email: string;
  }
  const accessToken = localStorage.getItem("AccessToken") as string;
  const decode = jwtDecode<jwtData>(accessToken!);

  async function handleSubmit() {
    const data = {
      email: decode.email,
      firstName,
      lastName,
      state,
      postal_code,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(data),
    };

    const request = await fetch(`${domain}/api/edit_profile`, option);
    const result = await request.text();
    if (request.ok) {
      localStorage.setItem("AccessToken", result);
      setToast(true);
      setErrType({ type: "success", msg: "Profile updated successfully" });
      setfirstName("");
      setlastName("");
      setState("");
      setpostal_code("");
    } else {
      setToast(true);
      setErrType({ type: "error", msg: result });
    }
  }
  return (
    <>
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
        <div className="w-full pt-3 max-lg:pt-14">
          <div className="flex justify-center">
            <p className="text-lg max-lg:text-xl font-semibold text-zinc-500 ">
              Edit Profile
            </p>
          </div>
          <div className=" w-full rounded-lg flex flex-col justify-center space-y-5 py-3  max-lg:shadow-transparent">
            <div className="flex gap-4">
              <CustomInput
                additionalclass={``}
                placeholder="FirstName"
                type="text"
                value={firstName}
                handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                  setfirstName(e.target.value);
                }}
              />
              <CustomInput
                additionalclass={``}
                placeholder="LastName"
                type="text"
                value={lastName}
                handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                  setlastName(e.target.value);
                }}
              />
            </div>
            <CustomInput
              additionalclass={``}
              placeholder="City/State"
              type="text"
              value={state}
              handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                setState(e.target.value);
              }}
            />
            <CustomInput
              additionalclass={``}
              placeholder="Postal Code"
              type="text"
              value={postal_code}
              handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                setpostal_code(e.target.value);
              }}
            />
            <CustomButton
              btn_text="Save"
              additionalclass="p-3"
              handleClick={handleSubmit}
            />
          </div>
        </div>
    </>
  );
}

export default EditProfile;
