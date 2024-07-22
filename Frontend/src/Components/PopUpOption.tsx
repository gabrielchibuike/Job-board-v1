import { BsFlagFill } from "react-icons/bs";
import { CgShare } from "react-icons/cg";
import  { RefObject, useState } from "react";
import { BiBookmark } from "react-icons/bi";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { domain } from "../api/client";
import { jobs_info } from "../utils/interface";
import ToastMsg from "../Reuseables/ToastMsg";

function PopUpOption({
  popUpOptionRef,
  jobs_info_id,
}: {
  popUpOptionRef: RefObject<HTMLDivElement>;
  jobs_info_id: jobs_info[];
}) {
  const [Toast, setToast] = useState(false);
  const [errType, setErrType] = useState({
    type: "",
    msg: "",
  });
  function closePopUpOption() {
    popUpOptionRef.current!.style.display = "none";
  }

  async function saveJob() {
    interface newJwtPayLoad extends JwtPayload {
      id: string;
      email: string;
    }

    const token = localStorage.getItem("AccessToken");
    const decoded: newJwtPayLoad = jwtDecode(token!);

    const request = await fetch(`${domain}/api/save-jobs/${decoded.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("AccessToken") as string,
      },
      body: JSON.stringify(jobs_info_id[0]),
    });
    console.log(request);

    if (request.ok) {
       await request.text();
      setToast(true);
      setErrType({ type: "success", msg: "Added successfully" });
    } else {
      const result = await request.text();
      if (result == "Forbidden") {
        // direct("/login");
      }
      console.log(result);
    }
  }

  return (
    <>
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
      <div className="hidden" ref={popUpOptionRef}>
        <div
          className="w-full min-h-screen fixed top-0 left-0 bg-[#00000091] flex items-end z-50 "
          onClick={closePopUpOption}
        >
          <div className="w-full h-[220px] fixed bottom-0 bg-zinc-100 rounded-t-3xl px-4 ">
            <div className="flex justify-center py-4">
              <div className="w-[60px]  h-2 rounded-md  bg-[#000000cb]"></div>
            </div>
            <div className="space-y-7 py-3">
              <div
                className="flex items-center gap-3 text-base text-zinc-600 font-semibold"
                onClick={saveJob}
              >
                <BiBookmark className="text-2xl" />
                Save Job
              </div>
              <div className="flex items-center gap-3 text-base text-zinc-600 font-semibold">
                <CgShare className="text-2xl" />
                Share Job
              </div>
              <div className="flex items-center gap-3 text-base text-zinc-600 font-semibold">
                <BsFlagFill className="text-2xl" />
                Report this Job
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopUpOption;
