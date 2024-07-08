import Button from "../../Reuseables/Button";

function AuthStep5({ handleClick }: { handleClick: () => void }) {
  return (
    <>
      <div className="w-[30%] h-screen max-lg:w-full flex flex-col py-10 items-center max-lg:p-2 max-lg:justify-center">
        <div>
          <img src="./started.png" alt="" />
        </div>
        <div className="space-y-2">
          <div className="text-center p-2 space-y-1">
            <div className="font-semibold text-xl">Congratulation</div>
            <div className="text-sm font-medium py-1 text-zinc-600">
              Thank you, we've got you covered
            </div>
          </div>
          <Button
            btn_text="Browse Jobs"
            additionalclass="w-full max-lg:w-full max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg"
            handleClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}

export default AuthStep5;
