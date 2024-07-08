import Button from "../Reuseables/Button";

function GetStarted() {
  return (
    <>
      <div className="mt-16 max-lg:mt-6">
        <div className="w-full flex bg-zinc-100 p-8 sm:p-10 rounded-2xl max-lg:flex-col-reverse">
          <div className="w-[50%] space-y-5 max-lg:w-full max-lg:space-y-2">
            <div className="text-2xl font-semibold max-lg:text-xl max-lg:mt-5 max-lg:text-center">
              Advance your career with Konnect.
            </div>
            <p className="w-[370px] mt-3 text-base text-zinc-700 font-medium max-lg:text-center max-lg:w-full">
              Create a free account, complete your profile, and get matched with
              your dream job.
            </p>
            <Button
              btn_text="Get Started"
              additionalclass=" w-full max-lg:py-3 py-3 flex items-center justify-center max-w-[180px] max-sm:mx-auto"
            />
          </div>
          <div className="w-[50%] bg-slate-500 flex justify-center max-lg:w-full rounded-2xl">
            <img
              src="./man2.png"
              alt=""
              className="object-contain w-[200px] "
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GetStarted;
