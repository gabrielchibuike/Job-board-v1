import Button from "../Reuseables/Button";

function CardSection2() {
  return (
    <>
      <div className="w-full h-screen max-lg:h-[500px] flex ">
        <div className="w-[50%]  py-20 flex justify-cente max-lg:hidden">
          <img src="image.png" alt="" className=" object-contain w-[400px]" />
        </div>
        <div className="w-full h-full  flex items-center justify-center max-lg:justify-start max-lg:px-7 space-y-3">
          <div className="flex flex-col ">
            <h1 className="font-semibold text-3xl text-zinc-800">
              Find your Perfect job <br /> based on{" "}
              <span className="italic text-blue-700">your interest</span>
            </h1>
            <ul className="space-y-2 list-disc text-base text-zinc-500 font-medium py-4">
              <li>
                Find full-time job and intership <br /> that are perfect for
                you.
              </li>
              <li>
                Get personalized job <br /> recommadation directly.
              </li>
              <li>
                Explore job roles based <br /> on your study najor.
              </li>
            </ul>
            <div>
              <Button btn_text={"Get Started"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardSection2;
