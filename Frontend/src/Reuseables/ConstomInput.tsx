import { ChangeEvent } from "react";

interface InputsTypes {
  placeholder: string;
  handleFocus: any;
  handleBlur: any;
  additionalclass?: string;
  handleChange?: any;
}
function ConstomInput({
  placeholder,
  handleFocus,
  handleBlur,
  additionalclass,
  handleChange,
}: InputsTypes) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full max-lg:bg-[#0000000e] outline-0 focus:border-b p-3 px-10 text-sm max-lg:px-8 focus: border-blue-700 ${additionalclass}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </>
  );
}

export default ConstomInput;
