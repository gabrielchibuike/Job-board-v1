import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function JobTypeFilter({
  Job_Type,
  setJob_Type,
}: {
  Job_Type: string;
  setJob_Type: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [Job_Type, setJob_Type] = useState("");
  const options = [
    {
      option: "Intership",
    },
    {
      option: "Permanent",
    },
    {
      option: "Contract",
    },
    {
      option: "Full-Time",
    },
    {
      option: "Part-Time",
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
    setJob_Type(value);
    setVisible(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative ">
        <div className="w-full flex gap-3 py-1 mt-5">
          <div
            className=" w-auto h-auto p-2 px-3 flex items-center gap-3 flex-shrink-0  bg-zinc-200 text-zinc-700 hover:bg-blue-700 hover:text-white cursor-pointer rounded-3xl  "
            onClick={() => dropDown()}
          >
            <p className="text-xs font-medium ">
              {visible == true ? Job_Type : "Job Type"}
            </p>
            <IoMdArrowDropdown className="text-xl" />
          </div>
        </div>
        {isOpen && (
          <div className="w-[200px] min-h-40 bg-zinc-50 shadow shadow-zinc-400 rounded-sm text-xs text-zinc-800 p absolute top-16 cursor-pointer">
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

export default JobTypeFilter;
