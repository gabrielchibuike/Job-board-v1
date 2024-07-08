import { useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function WorkPlaceType({
  workPlaceType,
  setWorkPlaceType,
}: {
  workPlaceType: string;
  setWorkPlaceType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = [
    {
      option: "onsite",
    },
    {
      option: "remote",
    },
    {
      option: "Hybrid",
    },
  ];

  function dropDown() {
    setIsOpen(true);
    if (isOpen == true) {
      setIsOpen(false);
      setVisible(false);
    }
  }

  const handleChange = (value: string) => {
    setWorkPlaceType(value);
    setVisible(true);
    setIsOpen(false);
  };
  return (
    <>
      <div className="relative dropdown" ref={dropdownRef}>
        <div className="w-full flex gap-3 py-1 mt-5 max:lg:overflow-x-scroll ">
          <div
            className=" w-auto h-auto p-2 px-3 flex items-center  gap-3 flex-shrink-0  bg-zinc-200 text-zinc-700 hover:bg-blue-700 hover:text-white cursor-pointer rounded-3xl  "
            onClick={() => dropDown()}
          >
            <p className="text-xs font-medium ">
              {visible == true ? workPlaceType : "WorkPlaceType"}
            </p>
            <IoMdArrowDropdown className="text-xl" />
          </div>
        </div>
        {isOpen && (
          <div className="w-[200px] min-h-40 bg-zinc-50 shadow shadow-zinc-400 rounded-sm text-xs text-zinc-800 p absolute top-16  cursor-pointer">
            {options.map((option) => (
              <div
                className="w-full flex items-center gap-4 hover:bg-zinc-200  p-2"
                onClick={() => handleChange(option.option)}
              >
                <p>{option.option} </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default WorkPlaceType;
