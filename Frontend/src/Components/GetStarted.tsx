import { useNavigate } from "react-router-dom";
import Button from "../Reuseables/Button";

function GetStarted() {
  const direct = useNavigate();
  return (
    <>
      <div className="w-full min-h-screen max-xl:min-h-[400px] flex flex-col justify-center">
        <div className="w-full min-h-[200px] flex bg-zinc-100 p-8 sm:p-10 rounded-2xl max-lg:flex-col-reverse">
          <div className="w-[50%] space-y-5 max-lg:w-full max-lg:space-y-2 flex flex-col justify-center">
            <div className="font-semibold text-3xl max-lg:text-2xl max-lg:mt-5 max-lg:text-center">
              Advance{" "}
              <span className="text-blue-700 italic"> your career </span>with
              Konnect.
            </div>
            <p className="w-[370px] mt-3 text-lg max-lg:text-base text-zinc-800/80 font-medium max-lg:text-center max-lg:w-full">
              Create a free account, complete your profile, and get matched with
              your dream job.
            </p>
            <div className="max-lg:flex max-lg:justify-center">
              <Button
                btn_text="Get Started"
                additionalclass=" "
                handleClick={() => {
                  direct("/login");
                }}
              />
            </div>
          </div>
          <div className="w-[50%] bg-slate-500 flex justify-center max-lg:w-full rounded-2xl">
            <img
              src="./man2.png"
              alt=""
              className="object-contain w-[250px] max-lg:w-[200px] "
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
