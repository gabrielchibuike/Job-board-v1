import ToastMsg from "../Reuseables/ToastMsg";
import CustomInput from "./authReuseable/CustomInput";
import CustomButton from "../Reuseables/Button";
import { ChangeEvent, useState } from "react";
import { domain } from "../api/client";
import { jwtDecode } from "jwt-decode";
import { updateSchema } from "../validation/validateUser";
import { BiLoaderAlt } from "react-icons/bi";

function ChangePassword() {
  // const direct = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [OldPassword, setOldPassword] = useState("");
  const [Newpassword, setNewPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
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
      OldPassword,
      Newpassword,
    };
    const { error } = updateSchema.validate({ Newpassword, Cpassword });
    const userError = error?.details[0].message;
    if (error) {
      console.log(userError);
      setToast(true);
      setErrType({ type: "error", msg: userError as string });
    }
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(data),
    };
    setIsLoading(false);
    const request = await fetch(`${domain}/api/change_password`, option);
    const result = await request.text();
    if (request.ok) {
      setIsLoading(true);
      setToast(true);
      setErrType({ type: "success", msg: "Password Changed Successfully" });
      setOldPassword("");
      setNewPassword("");
      setCPassword("");
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
      <div className="w-full pt- max-lg:pt-14">
        <div className="flex justify-center">
          <p className="text-lg max-lg:text-xl font-semibold text-zinc-500 ">
            Change Password
          </p>
        </div>
        <div className=" w-full rounded-lg flex flex-col justify-center space-y-5 py-3  max-lg:shadow-transparent">
          <CustomInput
            additionalclass={``}
            placeholder="Old Password"
            type="password"
            value={OldPassword}
            handleInput={(e: ChangeEvent<HTMLInputElement>) => {
              setOldPassword(e.target.value);
            }}
          />
          <CustomInput
            additionalclass={``}
            placeholder="New Password"
            type="password"
            value={Newpassword}
            handleInput={(e: ChangeEvent<HTMLInputElement>) => {
              setNewPassword(e.target.value);
            }}
          />
          <CustomInput
            additionalclass={``}
            placeholder="Confirm Password"
            type="password"
            value={Cpassword}
            handleInput={(e: ChangeEvent<HTMLInputElement>) => {
              setCPassword(e.target.value);
            }}
          />
          <CustomButton
            btn_text={
              isLoading ? (
                <div className="animate-spin w-full flex justify-center  text-2xl">
                  <BiLoaderAlt className="text-white" />
                </div>
              ) : (
                "Change Password"
              )
            }
            additionalclass="p-3"
            handleClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
