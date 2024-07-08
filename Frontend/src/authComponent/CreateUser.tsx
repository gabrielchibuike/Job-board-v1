import CustomInput from "../authComponent/authReuseable/CustomInput";
import MainContainer from "../Reuseables/MainContainer";
import { SetStateAction, useState } from "react";
import CustomButton from "../Reuseables/Button";
import { createUserSchema } from "../validation/validateUser";
import { btn } from "../utils/btn_info";
import { Link, useNavigate } from "react-router-dom";
import ToastMsg from "../Reuseables/ToastMsg";
import { domain } from "../api/client";
import { jwtDecode } from "jwt-decode";
import { FaHandsHelping } from "react-icons/fa";

function CreateUser() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [getStarted, setGetStarted] = useState(false);
  const [Toast, setToast] = useState(false);
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });

  async function handleSubmit() {
    const data = {
      email,
      password,
    };
    
    const { error } = createUserSchema.validate(data);
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
      const request = await fetch(`${domain}/api/access/create_user`, option);
      const result = await request.text();
      if (request.ok) {
        setToast(true);
        setErrType({ type: "success", msg: "Account Created" });
        localStorage.setItem('AccessToken', result)
        nav("/getStarted");
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
        <div className="w-full h-screen py-16  flex justify-center items-center flex-col">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 bg-blue-700 rounded-md flex justify-center items-center">
                <FaHandsHelping className="text-2xl text-white" />
              </div>
              <div className="font-bold text-3xl  text-blue-700 ">Konnect</div>
            </div>
            <p className="font-medium text-zinc-600">
              Create account to get started
            </p>
          </div>
          <div className=" p-4 w-full  max-w-[500px] rounded-lg flex flex-col justify-center space-y-5 my-2 max-lg:shadow-transparent">
            <CustomInput
              additionalclass={``}
              placeholder="Email"
              name={"email"}
              type="email"
              handleInput={(e: {
                target: { value: SetStateAction<string> };
              }) => {
                setEmail(e.target.value);
                console.log(email);
              }}
            />
            <CustomInput
              additionalclass={``}
              placeholder="Password"
              type="password"
              handleInput={(e: {
                target: { value: SetStateAction<string> };
              }) => {
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
            </div>
            <CustomButton
              btn_text="SignUp"
              additionalclass="p-3"
              handleClick={handleSubmit}
            />
            <div className="flex gap-5 justify-between">
              <p className="text-sm text-zinc-600 font-medium">
                Already have an account ?
              </p>{" "}
              <Link
                to={"/login"}
                className="text-[#3769f0fa] font-bold text-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
}

export default CreateUser;
