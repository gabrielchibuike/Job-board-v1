function BodyPage() {
  return (
    <>
      <div className="w-full min-h-screen max-xl:min-h-[500px] flex flex-col justify-center  space-y-1 max-lg:py-14">
        <h1 className="font-semibold text-3xl max-lg:text-2xl text-zinc-80 max-lg:text-center">
          How It <span className="text-blue-700 italic">Work</span>
        </h1>
        <p className="text-lg max-lg:text-base text-zinc-800/80 font-medium max-lg:text-center">
          Explore the following step to find a job easily.
        </p>

        <div className="flex gap-3 py-10 justify-between max-lg:flex-col max-lg:py-0">
          <div className="p-9 w-full flex flex-col items-center justify-center  relative">
            <div className="w-40 h-40 bg-blue-100/50 rounded-full flex justify-center items-center relative ">
              <p className="text-5xl font-semibold text-blue-700/50">1</p>
              <div className="w-20 h-20 bg-blue-300 rounded-full absolute -right-2 -top-2">
                <div className="w-20 h-20 bg-[#ffffffc3] border-[5px] border-blue-300/40  rounded-full"></div>
              </div>
            </div>
            <div className="py-2 space-y-1 ">
              <h1 className="text-xl font-semibold max-lg:text-center">
                Register Account
              </h1>
              <p className="font-medium text-zinc-500 max-lg:text-center">
                First, you need to make an account.
              </p>
            </div>
          </div>
          <div className="p-9 w-full flex flex-col items-center justify-center   relative">
            <div className="w-40 h-40 bg-blue-100/50 rounded-full flex justify-center items-center relative ">
              <p className="text-5xl font-semibold text-blue-700/50">2</p>
              <div className="w-20 h-20 bg-blue-300 rounded-full absolute -right-2 -top-2">
                <div className="w-20 h-20 bg-[#ffffffc3] border-[5px] border-blue-300/40  rounded-full"></div>
              </div>
            </div>
            <div className="py-2 space-y-1 max-lg:flex max-lg:flex-col max-lg:items-center">
              <h1 className="text-xl font-semibold max-lg:text-center">
                Find Job
              </h1>
              <p className="font-medium text-zinc-500 max-lg:text-center">
                Second, search for the job you want.
              </p>
            </div>
          </div>
          <div className="p-9 w-full flex flex-col items-center justify-center   relative">
            <div className="w-40 h-40 bg-blue-100/50 rounded-full flex justify-center items-center relative ">
              <p className="text-5xl font-semibold text-blue-700/50">3</p>
              <div className="w-20 h-20 bg-blue-300 rounded-full absolute -right-2 -top-2">
                <div className="w-20 h-20 bg-[#ffffffc3] border-[5px] border-blue-300/40  rounded-full"></div>
              </div>
            </div>
            <div className="py-2 space-y-1 max-lg:flex max-lg:flex-col max-lg:items-center">
              <h1 className="text-xl font-semibold max-lg:text-center">
                Apply Job
              </h1>
              <p className="font-medium text-zinc-500 max-lg:text-center">
                Third, apply for ypur desired role.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BodyPage;
