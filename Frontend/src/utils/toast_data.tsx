
import { IoMdCheckmarkCircleOutline } from "react-icons/io"; import { PiCloudWarningFill } from "react-icons/pi";
import { TbFaceIdError } from "react-icons/tb";
import { TiInfoLarge } from "react-icons/ti";

export const toast_dependencies = [
  {
    text: "success",
    text_color: "text-green-500",
    icon_bgcolor: "bg-green-500",
    icon: <IoMdCheckmarkCircleOutline />,
    body: "border-green-500 bg-green-100",
  },
  {
    text: "error",
    text_color: "text-red-500",
    icon_bgcolor: "bg-red-500",
    icon: <TbFaceIdError />,
    body: "border-red-500 bg-red-100",
  },
  {
    text: "warning",
    text_color: "text-amber-500",
    icon_bgcolor: "bg-amber-500",
    icon: <PiCloudWarningFill />,
    body: "border-amber-500 bg-amber-100",
  },
  {
    text: "info",
    text_color: "text-sky-500",
    icon_bgcolor: "bg-sky-500",
    icon: <TiInfoLarge />,
    body: "border-sky-500 bg-sky-100",
  },
];
