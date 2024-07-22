import { ChangeEvent, useState } from "react";
import CustomInput from "../authComponent/authReuseable/CustomInput";
import CustomButton from "../Reuseables/Button";
import MainContainer from "../Reuseables/MainContainer";
import { domain } from "../api/client";
import ToastMsg from "../Reuseables/ToastMsg";
import { emailSchema } from "../validation/validateUser";
import { useNavigate } from "react-router-dom";
import { FaHandsHelping } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

function VerifyEmail() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Toast, setToast] = useState(false);
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });
  async function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      email,
    };
    const { error } = emailSchema.validate(data);
    const userError = error?.details[0].message;
    if (error) {
      console.log(userError);
      setToast(true);
      setErrType({ type: "error", msg: userError as string });
    } else {
      const option = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      setIsLoading(true);
      const request = await fetch(`${domain}/api/access/userEmail`, option);
      const result = await request.text();
      if (request.ok) {
        setIsLoading(false);
        // localStorage.setItem("verifyEmailToken", result);
        setToast(true);
        setErrType({ type: "success", msg: "success" });
        setTimeout(() => {
          nav("/direct-to-email");
        }, 4000);
      } else {
        setToast(true);
        setErrType({ type: "error", msg: result });
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
              Enter email for verification
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex justify-center">
            <div className=" p-5 w-full max-w-[500px] rounded-lg flex flex-col justify-center space-y-5 my-2 max-lg:bg-transparent">
              <CustomInput
                additionalclass={``}
                placeholder="Email"
                type="email"
                handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
              <CustomButton
                additionalclass="p-3"
                btn_text={
                  isLoading ? (
                    <div className="animate-spin w-full flex justify-center  text-2xl">
                      <BiLoaderAlt className="text-white" />
                    </div>
                  ) : (
                    "Procced"
                  )
                }
              />
            </div>
          </form>
        </div>
      </MainContainer>
    </>
  );
}

export default VerifyEmail;
