import { useNavigate } from "react-router-dom";
import Button from "../Reuseables/Button";

function CardSection2() {
  const direct = useNavigate();
  return (
    <>
      <div className="w-full min-h-screen max-lg:h-[300px] max-xl:min-h-[400px]  flex  items-center">
        <div className="w-[50%]  py-20 flex items-center max-lg:hidden">
          <img src="image.png" alt="" className=" object-contain w-[500px]" />
        </div>
        <div className="w-full h-full  flex items-center justify-center max-lg:justify-start max-lg:px-7 space-y-3">
          <div className="flex flex-col ">
            <h1 className="font-semibold text-3xl max-lg:text-center  max-xl:text-center max-lg:text-2xl text-zinc-800">
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
              <Button
                btn_text={"Get Started"}
                handleClick={() => {
                  direct("/login");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardSection2;
