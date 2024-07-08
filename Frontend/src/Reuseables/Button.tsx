import { MouseEvent, MouseEventHandler } from "react";

function Button({
  btn_text,
  additionalclass,
  handleClick,
  type,
}: {
  btn_text: string;
  additionalclass?: string;
  handleClick?: any;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <>
      <button
        className={` p-2 px-4  rounded-md text-white text-center text-sm font-semibold cursor-pointer bg-blue-700 ${additionalclass}`}
        onClick={handleClick}
        type={type}
      >
        {btn_text}
      </button>
    </>
  );
}

export default Button;
