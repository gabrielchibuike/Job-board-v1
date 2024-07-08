import { JwtPayload, jwtDecode } from "jwt-decode";
import { domain } from "../api/client";
import { jobs_info } from "./interface";

export async function saveJob(jobs_id: jobs_info) {
  
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
    body: JSON.stringify(jobs_id),
  });
  console.log(request);

  if (request.ok) {
    const jobFeed = await request.text();
    console.log(jobFeed);
    // setToast(true);
    // setErrType({ type: "success", msg: "Added successfully" });
  } else {
    const result = await request.text();
    if (result == "Forbidden") {
      window.location.href = "/login";
    }
    console.log(result);
  }
}
