import SearchInput from "../Reuseables/SearchInput";

function HeaderSection() {
  return (
    <>
      <div className="w-full min-h-screen max-lg:min-h-[600px] max-lg:justify-normal max-xl:min-h-[400px] bg-b flex max-lg:flex-col-reverse justify-between items-center">
        <div className="max-lg:w-full space-y-5 ">
          <h1 className="font-semibold text-5xl max-lg:text-3xl text-zinc-800 max-lg:text-center">
            Find the <span className="italic text-blue-700">Perfect</span>{" "}
            <br /> job for you.{" "}
          </h1>
          <p className="text-lg max-lg:text-base text-zinc-800/80 font-medium max-lg:text-center">
            Fill your job in hour, not weeks. Search for free.
          </p>
          <div className="w-full">
            <SearchInput additional_class="!w-[100%] !mt-0" />
          </div>
        </div>
        <div className="w-[50%]  flex justify-center max-lg:w-full ">
          <img
            src="Screenshot 2024-07-20 094758.png"
            alt=""
            className=" object-contain w-[490px] max-lg:w-[250px] "
          />
        </div>
      </div>
    </>
  );
}

export default HeaderSection;
