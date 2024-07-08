import { useState } from "react";

interface InputsTypes {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  streetAddress: string;
  state: string;
  postalCode: string;
}
function CustomInput({
  placeholder,
  label,
  additionalclass,
  type,
  handleInput,
  name,
  value,
  InputRef,
  inputErr,
}: {
  placeholder?: string;
  label?: string;
  additionalclass?: string;
  type?: string;
  handleInput?: any;
  name?: any;
  value?: any;
  InputRef?: React.RefObject<HTMLInputElement>;
  inputErr?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  // const { inputErr } = useContext(ContextApi);
  return (
    <>
      <div className="w-full">
        <label className="text-xs font-medium">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          className={`w-full py-3 px-2 outline-0 rounded-lg text-sm bg-[#80808011] focus:border focus:border-blue-700  ${additionalclass}`}
          // onFocus={handleFocus}
          // onBlur={handleBlur}
          onChange={handleInput}
          ref={InputRef}
        />
        <p className="text-xs text-red-600 mt-3">{inputErr}</p>
      </div>
    </>
  );
}

export default CustomInput;
