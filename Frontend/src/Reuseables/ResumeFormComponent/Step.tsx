import Button from "../Button";

function Step({ handleClick }: any) {
  return (
    <>
        <div className="">
          <h3 className="text-2xl font-bold py-2 text-gray-700">
            Add a resume to konnect
          </h3>
          <div className="w-full flex gap-3 py-4">
            <Button btn_text="upload Resume" additionalclass="w-full py-3" />
            <Button
              btn_text="Build a konnect Resume"
              additionalclass="w-full py-3"
              handleClick={handleClick}
            />
          </div>
          <span className="text-sm text-zinc-700">
            By continuing you agree to receive job opportuinities from Konnect
          </span>
        </div>
    </>
  );
}

export default Step;
