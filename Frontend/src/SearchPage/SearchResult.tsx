import { useEffect, useRef, useState } from "react";
import { jobs_info } from "../utils/interface";
import SearchInput from "../Reuseables/SearchInput";
import SideNav from "../Components/SideNav";
import Nav from "../Components/Nav";
import { MdAddLocation } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import Button from "../Reuseables/Button";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import SearchResultCard from "./SearchResultCard";
import JobNotFound from "../Reuseables/JobNotFound";
import { saveJob } from "../utils/saveJobFunc";
import FilterComponent from "./FilterComponent";
import DOMPurify from "dompurify";
import ToastMsg from "../Reuseables/ToastMsg";
import Footer from "../Components/Footer";

function SearchResult() {
  const scrollhieght = useRef<HTMLDivElement>(null);
  const activeCard = useRef<HTMLDivElement[]>([]);
  const mobileView = useRef<HTMLDivElement>(null);
  const hideJobList = useRef<HTMLDivElement>(null);
  const [searchPayLoadInfo, setSearchPayLoadInfo] = useState<jobs_info[]>([]);

  const [Toast, setToast] = useState(false);

  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });

  const searchpayload = useSelector(
    (state: any) => state.searchResult.value.searchPayload
  );
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 160) {
        scrollhieght.current?.classList.add("sticky", "-top-10", "button-0");
      }
    });
  }, []);

  function handleClick(jobs_info: jobs_info, i: number) {
    // console.log(jobs_info);
    if (activeCard) {
      activeCard.current.forEach((e) => {
        e.classList.add("hover:shadow-blue-700", "shadow");
        e.classList.remove("border", "border-blue-700", "shadow-blue-700");
      });
      activeCard.current[i]!.classList.remove(
        "shadow",
        "shadow-zinc-700",
        "hover:shadow-blue-700"
      );
      activeCard.current[i]!.classList.add("border", "border-blue-700");
    }
    setSearchPayLoadInfo([jobs_info]);
  }

  // LOAD THE FIRST INDEX DATA
  useEffect(() => {
    searchpayload.map(async (ele: jobs_info, i: number) => {
      if (i == 0) {
        setSearchPayLoadInfo([ele]);
        if (activeCard) {
          activeCard.current[0]!.classList.remove(
            "shadow",
            "shadow-zinc-700",
            "hover:shadow-blue-700"
          );
          activeCard.current[0]!.classList.add("border", "border-blue-700");
        }
      }
    });
  }, [searchpayload]);


  return (
    <>
      <section>
        {Toast && (
          <div className="w-full fixed z-20 top-5 max-w-[250px]  left-1/2 -translate-x-1/2">
            <ToastMsg
              setToast={setToast}
              Toast={Toast}
              toastType={errType.type}
              toastMsg={errType.msg}
            />
          </div>
        )}
        <div className="block" ref={hideJobList}>
          <Nav activeRoute="/jobs" />
          <SideNav />
          <div className="px-20 max-lg:px-3">
            <SearchInput />
          </div>
          <div className="px-40 max-lg:px-3">
            <FilterComponent />
          </div>
          {searchpayload.length === 0 ? (
            <JobNotFound />
          ) : (
            <div className="w-full h-auto flex px-40  max-lg:px-4">
              <div className="w-[50%] max-lg:w-full ">
                <div className="font-semibold text-zinc-800 py-3 mt-3 text-base">
                  Found {searchpayload.length} results
                </div>

                <div className="px-3 space-y-5 max-lg:px-0">
                  <SearchResultCard
                    searchpayload={searchpayload}
                    handleClick={handleClick}
                    activeCard={activeCard}
                  />
                </div>
              </div>
              <div className="w-[50%] max-lg:hidden" ref={mobileView}>
                <div className="px-3 py-12 max-lg:px-0" ref={scrollhieght}>
                  <div className=" w-full h-auto rounded-2xl z-50">
                    {searchPayLoadInfo!.map((ele: jobs_info, index: number) => (
                      <div key={index}>
                        <div className="space-y-2 font-medium border border-zinc-300 shadow shadow-zinc-300 p-3">
                          <div className="font-bold text-xl text-blue-700">
                            {ele.JobTitle}
                          </div>
                          <div className="flex gap-5 text-sm items-center">
                            <div className="flex items-center gap-1">
                              <CiLocationArrow1 className="text-blue-700 font-semibold" />
                              <h3 className="text-zinc-600">{ele.Company}</h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <MdAddLocation className="text-blue-700" />
                              <h4 className="text-zinc-600">
                                {ele.JobLocation}
                              </h4>
                            </div>
                          </div>
                          <div className="flex gap-3 pt-1 text-xs">
                            <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl ">
                              {`${ele.Currency}  ${ele.Minimum} - ${ele.Maximum}  ${ele.Duration}`}
                            </h4>
                            <h4 className="bg-zinc-100  p-1 px-3 text-zinc-500 rounded-3xl">
                              {ele.JobType}
                            </h4>
                          </div>
                          <div className="w-36 flex items-center gap-5">
                            <Button
                              btn_text="Apply"
                              additionalclass="w-[600px]"
                              // handleClick={apply}
                            />
                            <div
                              className="p-[6px] w-auto h-auto bg-zinc-100 rounded-md cursor-pointer"
                              onClick={() => saveJob(ele, setToast, setErrType)}
                            >
                              <BsFillBookmarkFill className="text-xl text-zinc-400" />
                            </div>
                          </div>
                        </div>
                        <div className="py-4 px-4 overflow-y-scroll h-90">
                          <h2 className="font-semibold text-zinc-800">
                            Description
                          </h2>
                          <p
                            className="text-zinc-500 text-sm pt-2  line-clamp-5 "
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                ele.Description as unknown as string
                              ),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </section>
    </>
  );
}

export default SearchResult;
