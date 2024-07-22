import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../authComponent/authReuseable/CustomInput";
import MainContainer from "../Reuseables/MainContainer";
import CustomButton from "../Reuseables/Button";
import ToastMsg from "../Reuseables/ToastMsg";
import { ChangeEvent, useState } from "react";
import { domain } from "../api/client";
import { FaHandsHelping } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

function LoginAuth() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [Toast, setToast] = useState(false);
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });

  // let data = (location.state = "kdkfjf");
  // console.log(data);

  async function handleSubmit() {
    const data = {
      email,
      password,
    };
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    setIsLoading(true);
    const request = await fetch(`${domain}/api/access/login`, option);
    const result = await request.text();
    if (request.ok) {
      // console.log(result);
      setIsLoading(false);
      setToast(true);
      setErrType({ type: "success", msg: "success" });
      localStorage.setItem("AccessToken", result);
      setTimeout(() => {
        nav("/jobs");
      }, 2000);
    } else {
      setIsLoading(false);
      setToast(true);
      setErrType({ type: "error", msg: result });
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
        <div className="w-full h-screen py-16  flex justify-center items-center flex-col">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-blue-700 rounded-md flex justify-center items-center">
                <FaHandsHelping className="text-2xl text-white" />
              </div>
              <div className="font-bold text-3xl text-blue-700 ">Konnect</div>
            </div>
            <p className="font-medium text-zinc-600 ">
              Login to contiune with konnect
            </p>
          </div>
          <div className="p-4 w-full  max-w-[500px] rounded-lg flex flex-col justify-center space-y-5 my-2 max-lg:shadow-transparent">
            <CustomInput
              additionalclass={``}
              placeholder="Email"
              type="email"
              handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <CustomInput
              additionalclass={``}
              placeholder="Password"
              type="password"
              handleInput={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-2">
                <input type="checkbox" />
                <div className="text-sm text-zinc-600 font-medium">
                  Remember me
                </div>
              </div>
              <Link
                to={"/verify-email"}
                className="text-sm text-zinc-600 font-medium"
              >
                {" "}
                Forget Password{" "}
              </Link>
            </div>
            <CustomButton
              btn_text={
                isLoading ? (
                  <div className="animate-spin w-full flex justify-center  text-2xl">
                    <BiLoaderAlt className="text-white" />
                  </div>
                ) : (
                  "Login"
                )
              }
              additionalclass="p-3"
              handleClick={handleSubmit}
            />
            <div className="flex justify-between gap-5">
              <p className="text-sm text-zinc-600 font-medium">
                You don't have an account ?{" "}
              </p>{" "}
              <Link
                to={"/signup"}
                className="text-[#3769f0fa] text-sm font-bold"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
}

export default LoginAuth;
