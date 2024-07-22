import { useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import ChangePassword from "../authComponent/ChangePassword";
import EditProfile from "../authComponent/EditProfile";

function Settings() {
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const bluePrint = [
    {
      title: "Edit Profile",
      icon: <AiFillEdit className="text-2xl" />,
    },
    {
      title: "change password",
      icon: <AiFillEdit className="text-2xl" />,
    },
  ];
  const displayClickedIndex = useRef<HTMLDivElement[]>([]);

  function handleClickedIndex(index: number) {
    displayClickedIndex.current.forEach((ele) => {
      ele.style.display = "none";
    });
    if (index == 0) {
      setIsEditProfile(true);
    } else if (index == 1) {
      setIsChangePassword(true);
    }
    //  displayClickedIndex.current[index].style.display = 'flex'
  }
  return (
    <>
      <div className="w-full px-2">
        {bluePrint.map((e, index) => (
          <div
            className="flex flex-col space-y-3  py-2 max-lg:py-3"
            ref={(e: HTMLDivElement) => {
              displayClickedIndex.current[index] = e;
            }}
            onClick={() => handleClickedIndex(index)}
          >
            <div className=" w-full flex justify-between items-center">
              <div className="flex flex-col ">
                <span className="font-medium text-sm ">
                  {e.title}
                </span>
              </div>
              <div>{e.icon}</div>
            </div>
          </div>
        ))}
      </div>
      {isChangePassword && <ChangePassword />}
      {isEditProfile && <EditProfile />}
    </>
  );
}

export default Settings;
