import { ChangeEvent, useEffect, useRef, useState } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { InputsTypes } from "../utils/interface";
import { domain } from "../api/client";
import { JwtPayload, jwtDecode } from "jwt-decode";
import {
  JobDetails,
  JobDetails2,
  JobDetails3,
  JobDetails4,
} from "../validation/validateUser";
import ToastMsg from "../Reuseables/ToastMsg";
import FirstFormPage from "./FirstFormPage";
import SecondFormPage from "./SecondFormPage";
import ThirdFormPage from "./ThirdFormPage";
import ForthFormPage from "./ForthFormPage";
import FifthFormPage from "./FifthFormPage";
import SixthFormPage from "./SixthFormPage";
import SideNav from "../Components/SideNav";

function PostJob() {
  const direct = useNavigate();

  const [step, setSteps] = useState<number>(0);

  const [JobType, setJobType] = useState<string>("");

  const [Skills, setSkills] = useState<string[]>([]);

  const [benefits, setBenefits] = useState<string[]>([]);

  const [Records, setRecords] = useState<InputsTypes>({});

  const [Toast, setToast] = useState(false);

  const selectItemRef = useRef<HTMLDivElement[]>([]);

  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });

  const [value, setValue] = useState("");

  const [Inputs, setInputs] = useState({
    JobTitle: "",
    Company: "",
    WorkPlaceType: "",
    JobLocation: "",
    JobType: "",
    Description: "",
    Skills: "",
    Currency: "",
    Minimum: "",
    Maximum: "",
    Duration: "",
    Benefits: "",
    RecieveApplicant: "",
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

  const validate1 = {
    JobTitle: Inputs.JobTitle,
    Company: Inputs.Company,
    WorkPlaceType: Inputs.WorkPlaceType,
    JobLocation: Inputs.JobLocation,
  };

  const validate2 = {
    Description: value,
  };

  const validate3 = {
    JobType: JobType,
    Skills: Skills,
  };

  const validate4 = {
    RecieveApplicant: Inputs.RecieveApplicant,
  };

  function handleStep(index: number) {
    if (index == 0) {
      setSteps(1);
    } else if (index == 1) {
      const { error } = JobDetails.validate(validate1);
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
            JobTitle: Inputs.JobTitle,
            Company: Inputs.Company,
            WorkPlaceType: Inputs.WorkPlaceType,
            JobLocation: Inputs.JobLocation,
          };
        });
        setSteps(2);
      }
    } else if (index == 2) {
      const { error } = JobDetails2.validate(validate2);
      const userError = error?.details[0].message;
      if (error) {
        setToast(true);
        setErrType({ type: "error", msg: userError as string });
      } else {
        setRecords((previnfo) => {
          return {
            ...previnfo,
            Description: value,
          };
        });
        setSteps(3);
      }
    } else if (index == 3) {
      const { error } = JobDetails3.validate(validate3);
      const userError = error?.details[0].message;
      if (error) {
        setToast(true);
        setErrType({ type: "error", msg: userError as string });
      } else {
        setRecords((previnfo) => {
          return {
            ...previnfo,
            JobType: JobType,
            Skills: Skills,
          };
        });
        setSteps(4);
      }
    } else if (index == 4) {
      const { error } = JobDetails4.validate(validate4);
      const userError = error?.details[0].message;
      if (error) {
        setToast(true);
        setErrType({ type: "error", msg: userError as string });
      } else {
        setRecords((previnfo) => {
          return {
            ...previnfo,
            Currency: Inputs.Currency,
            Maximum: Inputs.Maximum,
            Minimum: Inputs.Minimum,
            Duration: Inputs.Duration,
            Benefits: benefits,
            RecieveApplicant: Inputs.RecieveApplicant,
          };
        });
        setSteps(5);
      }
    } else if (index == 5) {
      direct("/jobs");
    }
  }

  useEffect(() => {
    if (step == 5) {
      routeNext();
    }
  }, [Records]);

  function handleStepBackward(index: number) {
    if (index == 2) {
      setSteps(1);
    } else if (index == 3) {
      setSteps(2);
    } else if (index == 4) {
      setSteps(3);
    } else if (index == 5) {
      setSteps(4);
    }
  }

  async function routeNext() {
    const data = {
      ...Records,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(data),
    };
    const request = await fetch(`${domain}/api/create_job`, option);
    console.log(request);

    if (request.ok) {
      const result = await request.text();
      console.log(result);
    } else {
      const result = await request.text();
       if (result == "Forbidden") {
         direct("/login");
       }
    }
  }

  useEffect(() => {
    console.log(Records);
  }, [Records]);
  return (
    <>
      <Nav activeRoute="/jobs" />
      <SideNav />
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
      {step == 0 ? (
        <FirstFormPage handleClick={() => handleStep(0)} />
      ) : step == 1 ? (
        <SecondFormPage
          handleClick={() => handleStep(1)}
          handleStepBackward={() => handleStepBackward(1)}
          handleInput={handleInputs}
          Inputs={Inputs}
          setInputs={setInputs}
        />
      ) : step == 2 ? (
        <ThirdFormPage
          handleClick={() => handleStep(2)}
          handleStepBackward={() => handleStepBackward(2)}
          handleInput={handleInputs}
          value={value}
          setValue={setValue}
        />
      ) : step == 3 ? (
        <ForthFormPage
          handleClick={() => handleStep(3)}
          handleStepBackward={() => handleStepBackward(3)}
          JobType={JobType}
          setJobType={setJobType}
          handleInput={handleInputs}
          Inputs={Inputs}
          Skills={Skills}
          setSkills={setSkills}
          selectItemRef={selectItemRef}
          // setInputs={setInputs}
        />
      ) : step == 4 ? (
        <FifthFormPage
          handleClick={() => handleStep(4)}
          handleStepBackward={() => handleStepBackward(4)}
          handleInput={handleInputs}
          Inputs={Inputs}
          benefits={benefits}
          setBenefits={setBenefits}
        />
      ) : step == 5 ? (
        <SixthFormPage handleClick={() => handleStep(5)} />
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}

export default PostJob;
