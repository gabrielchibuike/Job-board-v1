import { IoMdSearch } from "react-icons/io";
import ConstomInput from "./ConstomInput";
import { ImLocation } from "react-icons/im";
import Button from "./Button";
import { ChangeEvent, useEffect, useState } from "react";
import { domain } from "../api/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchPayload, isLoading } from "../ReduxStore/store";

// interface setType {
//   setSearchResult?: React.Dispatch<React.SetStateAction<jobs_info[]>>;
// }
function SearchInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [Jobs, setJobs] = useState("");
  const [Location, setLocation] = useState("");
  const [searchParams] = useSearchParams();
  const direct = useNavigate();
  const dispatch = useDispatch();

  function handleFocus() {
    setIsFocused(true);
  }
  function handleBlur() {
    setIsFocused(false);
  }
  // HANDLE SUMBIT
  async function handleSearch(e: any) {
    e.preventDefault();
    const searchValues = new URLSearchParams({
      Jobs,
      Location,
    });

    // const newpath = `/jobs-result?job=${Jobs}&location=${Location}`;
    const option = {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
    };

    dispatch(isLoading({ isLoading: true }));
    const request = await fetch(
      `${domain}/api/search-jobs?${searchValues.toString()}`,
      option
    );
    if (request.ok) {
      
      direct(`/search-result?job=${Jobs}&location=${Location}`);

      setTimeout(async () => {
        dispatch(isLoading({ isLoading: false }));

        const result = await request.json();

        
        dispatch(searchPayload({ searchPayload: [...result] }));
        // setSearchResult!([...result]);
      }, 2000);
    } else if (request.status == 400) {
      const result = await request.text();
      console.log(result);
    }
  }

  // Refatch data when the browser reloads
  async function ReFetchData() {
    const Jobs = searchParams.get("job") as string;
    const Location = searchParams.get("location") as string;
    const searchValues = new URLSearchParams({ Jobs, Location });
    const option = {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
    };
    const request = await fetch(
      `${domain}/api/search-jobs?${searchValues.toString()}`,
      option
    );
    if (request.ok) {
      const result = await request.json();
      dispatch(searchPayload({ searchPayload: [...result] }));
    } else if (request.status == 400) {
      const result = await request.text();
      console.log(result);
    }
  }

  useEffect(() => {
    ReFetchData();
  }, []);

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="w-full h-auto flex justify-center">
          <div className=" w-[60%] h-auto flex justify-center mt-6  rounded-lg shadow-zinc-500 shadow max-lg:flex-col  max-lg:w-full max-lg:p-0 max-lg:gap-4 max-lg:shadow-none">
            <div className="w-full relative ">
              <ConstomInput
                placeholder="Job title, keyword, or company"
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                additionalclass="text-zinc-600 max-sm:rounded-lg"
                handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setJobs(e.target.value);
                }}
              />
              <IoMdSearch
                className={`absolute top-3 left-3 text-lg max-lg:left-2 max-lg:top-4 ${
                  isFocused ? "text-blue-700" : "text-zinc-500"
                }`}
              />
            </div>
            <div className="w-full relative ">
              <ConstomInput
                placeholder="Location"
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                additionalclass="  max-sm:rounded-lg"
                handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setLocation(e.target.value);
                }}
              />
              <ImLocation
                className={`absolute top-3 left-3 text-lg max-lg:left-2 max-lg:top-4 ${
                  isFocused ? "text-blue-700" : "text-zinc-500"
                }`}
              />
            </div>
            <div className="flex items-center px-4 max-lg:px-0 ">
              <Button
                btn_text="Search"
                additionalclass="max-lg:w-full max-lg:text-center text-lg  max-lg:py-3 rounded-lg"
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchInput;
