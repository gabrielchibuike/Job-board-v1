import SearchInput from "../Reuseables/SearchInput";

function HeaderSection() {
  return (
    <>
      <div className="w-full min-h-screen  flex max-lg:flex-col-reverse max-lg:justify-normal justify-between items-center ">
        <div className="max-lg:w-full space-y-5 ">
          <h1 className="font-semibold text-5xl max-lg: text-zinc-800 max-lg:text-center">
            Find the <span className="italic text-blue-700">Perfect</span>{" "}
            <br /> job for you.{" "}
          </h1>
          <p className="text-lg text-zinc-800/80 font-medium max-lg:text-center">
            Fill your job in hour, not weeks. Search for free.
          </p>
          <div className="w-full">
            <SearchInput additional_class="!w-[100%] !mt-0" />
          </div>
        </div>
        <div className=" h-[300px] bg-blac max-lg:flex max-lg:items-center max-lg:w-full">
          <img
            src="Screenshot 2024-07-20 094758.png"
            alt=""
            className=" w-full h-[300px] max-lg:h-[250px]  object-contain max-lg:object-cove"
          />
        </div>
      </div>
    </>
  );
}

export default HeaderSection;
