import JobTypeFilter from "./JobTypeFilter";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { domain } from "../api/client";
import WorkPlaceType from "./WorkPlaceType";
import { useDispatch } from "react-redux";
import { searchPayload } from "../ReduxStore/store";

function FilterComponent() {
  const [searchParams] = useSearchParams();
  const [Job_Type, setJob_Type] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState("");
  const dispatch = useDispatch();

  // const direct = useNavigate();

  async function getFilteredResult() {
    const Jobs = searchParams.get("job") as string;
    const Location = searchParams.get("location") as string;
    const searchValues = new URLSearchParams({
      Jobs,
      Location,
      Job_Type,
      workPlaceType,
    });
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
    }
  }

  useEffect(() => {
    getFilteredResult();
  }, [Job_Type, workPlaceType]);

  return (
    <>
      <div className="w-full">
        <div className="flex gap-4  ">
          <JobTypeFilter setJob_Type={setJob_Type} Job_Type={Job_Type} />
          <WorkPlaceType
            setWorkPlaceType={setWorkPlaceType}
            workPlaceType={workPlaceType}
          />
        </div>
      </div>
    </>
  );
}

export default FilterComponent;
