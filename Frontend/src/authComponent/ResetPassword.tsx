import { ChangeEvent, FormEvent, useRef, useState } from "react";
import CustomInput from "../authComponent/authReuseable/CustomInput";
import CustomButton from "../Reuseables/Button";
import MainContainer from "../Reuseables/MainContainer";
import { updateSchema } from "../validation/validateUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import { domain } from "../api/client";
import { jwtDecode } from "jwt-decode";
import ToastMsg from "../Reuseables/ToastMsg";
import { FaHandsHelping } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

function ResetPassword() {
  const direct = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const disabledBtn = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Cpassword, setCPassword] = useState("");
  const [Toast, setToast] = useState(false);
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });
  interface jwtData {
    email: string;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const Token = searchParams.get("token") as string;
    console.log(Token);

    const decode = jwtDecode<jwtData>(Token!);
    const data = {
      password,
      email: decode.email,
    };
    const { error } = updateSchema.validate({ password, Cpassword });
    const userError = error?.details[0].message;
    if (error) {
      console.log(userError);
      setToast(true);
      setErrType({ type: "error", msg: userError as string });
    } else {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": Token,
        },
        body: JSON.stringify(data),
      };
      setIsLoading(true);
      disabledBtn.current!.disabled = true;
      const request = await fetch(
        `${domain}/api/access/reset_password`,
        option
      );
      const result = await request.text();
      if (request.ok) {
        setIsLoading(false);
        disabledBtn.current!.disabled = false;
        setToast(true);
        setErrType({ type: "success", msg: "success" });
        setTimeout(() => {
          direct("/jobs");
        }, 5000);
      } else if (request.status === 403 || request.status === 401) {
        setIsLoading(false);
        disabledBtn.current!.disabled = false;
        setToast(true);
        setErrType({ type: "error", msg: result });
        setTimeout(() => {
          direct("/login");
        }, 5000);
      }
    }
  }
  return (
    <>
      <MainContainer>
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
        <div className="w-full h-screen flex justify-center items-center flex-col">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-blue-700 rounded-md flex justify-center items-center">
                <FaHandsHelping className="text-2xl text-white" />
              </div>
              <div className="font-bold text-3xl  text-blue-700 ">Konnect</div>
            </div>
            <p className="font-medium text-zinc-600">
              Reset your password to continue
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex justify-center">
            <div className=" p-4 w-full  max-w-[500px] rounded-lg flex flex-col justify-center space-y-5 my-2 max-lg:bg-transparent">
              <CustomInput
                additionalclass={``}
                placeholder="New Password"
                type="password"
                handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
              <CustomInput
                additionalclass={``}
                placeholder="Confirm password"
                type="password"
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
                    "Reset Password"
                  )
                }
                additionalclass="p-3"
                disabled={disabledBtn}
              />
            </div>
          </form>
        </div>
      </MainContainer>
    </>
  );
}

export default ResetPassword;
