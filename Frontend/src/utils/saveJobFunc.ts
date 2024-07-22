import { JwtPayload, jwtDecode } from "jwt-decode";
import { domain } from "../api/client";
import { jobs_info } from "./interface";

export async function saveJob(
  jobs_id: jobs_info,
  setToast: React.Dispatch<React.SetStateAction<boolean>>,
  setErrType: React.Dispatch<
    React.SetStateAction<{
      type: string;
      msg: string;
    }>
  >
) {
  // const [Toast, setToast] = useState(false);

  // const [errType, setErrType] = useState({
  //   type: "",
  //   msg: "",
  // });

  interface newJwtPayLoad extends JwtPayload {
    _id: string;
    email: string;
  }
  const token = localStorage.getItem("AccessToken");
  const decoded: newJwtPayLoad = jwtDecode(token!);

  const request = await fetch(`${domain}/api/save-jobs/${decoded._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("AccessToken") as string,
    },
    body: JSON.stringify(jobs_id),
  });
  console.log(request);

  if (request.ok) {
     await request.text();
    setToast(true);
    setErrType({ type: "success", msg: "Job saved successfully" });
  } else {
    const result = await request.text();
    setToast(true);
    setErrType({ type: "error", msg: "Something went wrong" });
    if (result == "Forbidden") {
      window.location.href = "/login";
    }
    console.log(result);
  }
}
