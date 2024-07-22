import { BiEuro } from "react-icons/bi";
import { BsCurrencyPound } from "react-icons/bs";
import { IoLogoYen } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { BiDollar } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
import Button from "../Reuseables/Button";
import CustomInput from "../authComponent/authReuseable/CustomInput";
import { InputsTypes2 } from "../utils/interface";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function FifthFormPage({
  handleClick,
  handleStepBackward,
  handleInput,
  Inputs,
  benefits,
  setBenefits,
}: {
  handleClick: () => void;
  handleStepBackward: () => void;
  handleInput: any;
  Inputs: InputsTypes2;
  benefits: string[];
  setBenefits: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const displayOptionRef1 = useRef<HTMLDivElement>(null);

  const displayOptionRef2 = useRef<HTMLDivElement>(null);

  const [displayCurrency, setdisplayCurrency] = useState({
    country: "USD",
    symbol: <BiDollar className="text-lg" />,
  });

  const [displayRate, setdisplayRate] = useState({
    title: "Per Hour",
  });

  const Currency = [
    {
      country: "USD",
      symbol: <BiDollar className="text-lg" />,
    },
    {
      country: "RUP",
      symbol: <BiRupee className="text-lg" />,
    },
    {
      country: "YEN",
      symbol: <IoLogoYen className="text-lg" />,
    },
    {
      country: "POUNDS",
      symbol: <BsCurrencyPound className="text-lg" />,
    },
    {
      country: "EURO",
      symbol: <BiEuro className="text-lg" />,
    },
    {
      country: "NGN",
      symbol: <TbCurrencyNaira className="text-lg" />,
    },
  ];

  const rate = [
    {
      title: "Per Hour",
    },
    {
      title: "Per Week",
    },
    {
      title: "Per Month",
    },
  ];

  function openOption1() {
    if (displayOptionRef1.current?.classList.contains("block")) {
      displayOptionRef1.current?.classList.replace("block", "hidden");
    } else {
      displayOptionRef1.current?.classList.replace("hidden", "block");
    }
  }

  function openOption2() {
    if (displayOptionRef2.current?.classList.contains("block")) {
      displayOptionRef2.current?.classList.replace("block", "hidden");
    } else {
      displayOptionRef2.current?.classList.replace("hidden", "block");
    }
  }

  function switchCurrency(ele: any) {
    displayOptionRef1.current?.classList.replace("block", "hidden");
    setdisplayCurrency(ele);
    Inputs.Currency = ele.country;
  }

  function switchRate(ele: any) {
    displayOptionRef2.current?.classList.replace("block", "hidden");
    setdisplayRate(ele);
    Inputs.Duration = ele.title;
  }

  function addBenefits(index: any) {
    setBenefits((prev) => {
      return [...prev, Inputs.Benefits as string];
    });

    if (benefits.length == 5) {
      const FilteredDesiredJobs = benefits.filter((i) => i != index);
      setBenefits(FilteredDesiredJobs);
      // setToast(true);
    }
  }

  function removeBenefits(index: number) {
    const FilteredDesiredJobs = benefits.filter((_, i) => i != index);
    setBenefits(FilteredDesiredJobs);
  }

  useEffect(() => {
    console.log(benefits);
  }, [benefits]);

  useEffect(() => {
    setdisplayCurrency(Currency[0]);
    setdisplayRate(rate[0]);
    Inputs.Currency = Currency[0].country;
    Inputs.Duration = rate[0].title;
  }, []);

  return (
    <>
        <div className="w-full max-lg:h-[800px] flex flex-col justify-center  items-center max-lg:px-3 ">
        <div className="w-full h-screen flex justify-center items-center py-14 max-lg:h-auto">
          <div className="w-full max-w-[570px] rounded-xl max-lg:bg-transparent py-3 px-5 max-lg:px-0">
            <img src="benefit.png" alt="" />
            <div className="space-y-">
              <div className="font-medium text-sm pt-3">Pay</div>
              <div className="flex gap-5 max-lg:flex-col">
                <div className="w-full relative">
                  <label className="text-xs font-medium">Currency</label>
                  <div
                    className="w-full flex justify-between items-center  py-3 px-2 outline-0 rounded-lg text-sm bg-[#80808011] focus:border focus:border-blue-700"
                    onClick={openOption1}
                  >
                    <div className="flex items-center gap-3">
                      <div>{displayCurrency.symbol}</div>
                      <p>{displayCurrency.country}</p>
                    </div>
                    <div>
                      <MdKeyboardArrowDown className="text-lg" />
                    </div>
                  </div>
                  <div
                    className="w-full absolute  justify-between items-center  py-3 px-2 outline-0 rounded-sm text-sm bg-zinc-100 cursor-pointer hidden"
                    ref={displayOptionRef1}
                  >
                    {Currency.map((ele, i) => (
                      <div
                        key={i}
                        className="flex h-7 items-center gap-1 "
                        onClick={() => switchCurrency(ele)}
                      >
                        <div>{ele.symbol}</div>
                        <div className="text-xs">{ele.country}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <CustomInput
                  placeholder=""
                  label="minimum"
                  value={Inputs.Minimum}
                  name={"Minimum"}
                  handleInput={handleInput}
                />
                <CustomInput
                  placeholder=""
                  label="maximum"
                  value={Inputs.Maximum}
                  name={"Maximum"}
                  handleInput={handleInput}
                />

                <div className="w-full relative">
                  <label className="text-xs font-medium">Duration</label>
                  <div
                    className="w-full flex justify-between items-center  py-3 px-2 outline-0 rounded-lg text-sm bg-[#80808011] focus:border focus:border-blue-700"
                    onClick={openOption2}
                  >
                    <div className="flex items-center gap-3">
                      <div>{displayRate.title}</div>
                    </div>
                    <div>
                      <MdKeyboardArrowDown className="text-lg" />
                    </div>
                  </div>
                  <div
                    className="w-full absolute justify-between items-center  py-3 px-2 outline-0 rounded-sm text-sm bg-zinc-100  cursor-pointer hidden"
                    ref={displayOptionRef2}
                  >
                    {rate.map((ele, i) => (
                      <div
                        key={i}
                        className="flex h-7 items-center gap-1 "
                        onClick={() => switchRate(ele)}
                      >
                        <div className="ext-xs">{ele.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="w-full flex items-center justify-between gap-4">
                  <CustomInput
                    placeholder="eg.Visa Sponsor"
                    label="Benefits"
                    name={"Benefits"}
                    value={Inputs.Benefits}
                    handleInput={handleInput}
                    additionalclass="w-auto font-meduim"
                  />
                  <div
                    className="w-20 h-10 text-center p-2 mt-3  rounded-md text-white text-sm font-semibold cursor-pointer  bg-blue-700"
                    onClick={(i) => addBenefits(i)}
                  >
                    Add
                  </div>
                </div>
                <div className="space-y-2 cursor-pointer mt-3">
                  {benefits.map((benefits, index) => (
                    <div
                      className="rounded-md w-full h-10 bg-zinc-200 px-3 py-6 flex items-center justify-between text-sm text-zinc-600 font-medium"
                      key={index}
                    >
                      {benefits}
                      <div onClick={() => removeBenefits(index)}>
                        <AiOutlineClose />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <CustomInput
                  placeholder=""
                  label="Recieve applicant through email or url"
                  value={Inputs.RecieveApplicant}
                  name={"RecieveApplicant"}
                  handleInput={handleInput}
                />
              </div>

              <div className="w-full py-3 flex justify-between gap-5">
                <Button
                  btn_text="Back"
                  additionalclass="w-[200px] bg-transparent border border-blue-700 max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg !text-blue-700"
                  handleClick={handleStepBackward}
                />

                <Button
                  btn_text="Continue"
                  additionalclass="w-[200px]  max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg"
                  handleClick={handleClick}
                />
              </div>
            </div>
          </div>
        </div>
        </div>
    </>
  );
}

export default FifthFormPage;
