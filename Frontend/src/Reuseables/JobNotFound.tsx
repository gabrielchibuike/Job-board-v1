import Button from "./Button";
import { useNavigate } from "react-router-dom";

function JobNotFound() {
  const direct = useNavigate();
  return (
    <>
      <div className=" w-full h-[450px] flex  flex-col items-center justify-center space-y-2">
        <div className="w-full h-[250px] flex justify-center">
          <img
            src="NotFound.png"
            alt=""
            className=" h-[250px] object-contain "
          />
        </div>
        <div className="text-xl font-bold text-zinc-600">Job not found</div>
        <div className="text-sm font-medium text-zinc-500 text-center">
          We can't find the result for the related search.
        </div>
        <Button
          btn_text="Browse Jobs"
          handleClick={() => {
            direct("/jobs");
          }}
        />
      </div>
    </>
  );
}

export default JobNotFound;
