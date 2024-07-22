import React, { useEffect, useRef } from "react";
import { toast_dependencies } from "../utils/toast_data";

interface Toaststype {
  toastMsg: string;
  toastType: string;
  Toast?: boolean;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}

function ToastMsg({ Toast, setToast, toastMsg, toastType }: Toaststype) {
  const pop_toast = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      pop_toast.current?.classList.replace("popup_entrance", "popup_exit");
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }, 5000);
  }, [Toast]);

  return (
    <>
      <div className="w-full popup_entrance" ref={pop_toast}>
        {toast_dependencies.map((dependency) =>
          dependency.text == toastType ? (
            <div
              className={`p-2 w-full border rounded-lg ${dependency.body} flex items-center gap-2`}
            >
              <div
                className={`${dependency.icon_bgcolor} flex-shrink-0 text-white text-lg w-[30px] h-[30px] rounded-lg flex items-center justify-center `}
              >
                {/* <IoMdCheckmarkCircleOutline /> */}
                {dependency.icon}
              </div>
              <div className="w-full">
                <span
                  className={`font-semibold capitalize ${dependency.text_color}`}
                >
                  {toastType}:{" "}
                </span>
                <span
                  className={`text-xs text-center ${dependency.text_color}`}
                >
                  {toastMsg}
                </span>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
}

export default ToastMsg;
