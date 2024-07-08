import Button from "../Reuseables/Button";

function SixthFormPage({ handleClick }: { handleClick: () => void }) {
  return (
    <>
      <div className="w-full flex justify-center items-cente">
        <div className="w-[40%]  max-lg:w-full flex flex-col py-10 items-center max-lg:px-2 max-lg:justify-center">
          <img src="./started.png" alt="" />
          <div className="space-y-3">
            <div className="text-center p-3 space-y-2">
              <h2 className="text-2xl text-zinc-900 font-bold ">
                Congratulation
              </h2>
              <p className="text-md font-medium text-zinc-600">
                You've succefully posted a job.
              </p>
            </div>
            <Button
              btn_text="Back To Job Feed"
              additionalclass="w-full max-lg:w-full max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg"
              handleClick={handleClick}
              type="submit"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SixthFormPage;
