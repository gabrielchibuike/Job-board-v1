import { ChangeEvent, useState } from "react";
import AuthStep1 from "./authReuseable/AuthStep1";
import AuthStep2 from "./authReuseable/AuthStep2";
import AuthStep3 from "./authReuseable/AuthStep3";
import AuthStep4 from "./authReuseable/AuthStep4";
import { useNavigate } from "react-router-dom";
import { InputsTypes } from "../utils/interface";
import { domain } from "../api/client";
import { JwtPayload, jwtDecode } from "jwt-decode";
import AuthStep5 from "./authReuseable/AuthStep5";
import { location, userName } from "../validation/validateUser";
import ToastMsg from "../Reuseables/ToastMsg";

function GetStarted() {
  const nav = useNavigate();
  const [step, setSteps] = useState<number>(0);
  const [desiredJob, setDesiredJob] = useState<string[]>([]);
  const [Records, setRecords] = useState<InputsTypes>({});
  const [Toast, setToast] = useState(false);
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });
  const [Inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    state: "",
    postal_code: "",
    desired_jobs: "",
  });

  function handleInputs(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  }
  interface newJwtPayLoad extends JwtPayload {
    id: string;
    email: string;
  }
  const token = localStorage.getItem("AccessToken");
  const decoded: newJwtPayLoad = jwtDecode(token!);

  const data1 = {
    firstName: Inputs.firstName,
    lastName: Inputs.lastName,
  };
  const data2 = {
    state: Inputs.state,
    postal_code: Inputs.postal_code,
  };

  function handleStep(index: number) {
    if (index == 0) {
      setSteps(1);
    } else if (index == 1) {
      const { error } = userName.validate(data1);
      const userError = error?.details[0].message;
      if (error) {
        setToast(true);
        setErrType({ type: "error", msg: userError as string });
      } else {
        setRecords((previnfo) => {
          return {
            ...previnfo,
            id: decoded.id,
            email: decoded.email,
            firstName: Inputs.firstName,
            lastName: Inputs.lastName,
          };
        });
        setSteps(2);
      }
    } else if (index == 2) {
      const { error } = location.validate(data2);
      const userError = error?.details[0].message;
      if (error) {
        setToast(true);
        setErrType({ type: "error", msg: userError as string });
      } else {
        setRecords((previnfo) => {
          return {
            ...previnfo,
            state: Inputs.state,
            postal_code: Inputs.postal_code,
          };
        });
        setSteps(3);
      }
    } else if (index == 3) {
      setRecords((previnfo) => {
        return {
          ...previnfo,
          desired_jobs: desiredJob,
        };
      });
      setSteps(4);
    } else if (index == 4) {
      routeNext();
    }
  }

  async function routeNext() {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(Records),
    };
    const request = await fetch(`${domain}/api/access/more_user_info`, option);
    const result = await request.text();
    if (request.ok) {
      localStorage.setItem("AccessToken", result);
      nav("/jobs");
    } else {
      console.log(result);
    }
  }

  // useEffect(() => {
  //   console.log(Records);
  // }, [Records]);
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
      <div className="w-full flex flex-col items-center max-lg:px-3 ">
        {step == 0 ? (
          <AuthStep1 handleClick={() => handleStep(0)} />
        ) : step == 1 ? (
          <AuthStep2
            handleClick={() => handleStep(1)}
            handleInput={handleInputs}
            Inputs={Inputs}
          />
        ) : step == 2 ? (
          <AuthStep3
            handleClick={() => handleStep(2)}
            handleInput={handleInputs}
            Inputs={Inputs}
          />
        ) : step == 3 ? (
          <AuthStep4
            handleClick={() => handleStep(3)}
            handleInput={handleInputs}
            Inputs={Inputs}
            setDesiredJob={setDesiredJob}
            desiredJob={desiredJob}
          />
        ) : step == 4 ? (
          <AuthStep5 handleClick={() => handleStep(4)} />
        ) : (
          ""
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default GetStarted;
