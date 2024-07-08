import { BrowserRouter, Route, Routes } from "react-router-dom";
// import JobListing from "./Components/JobListing"
import Home from "./User_pages/Home";
import BuildResume from "./User_pages/BuildResume";
import Community from "./User_pages/Community";
import Jobs from "./User_pages/Jobs";
import CreateUser from "./authComponent/CreateUser";
import LoginAuth from "./authComponent/LoginAuth";
import { Context, RefObject, createContext, useRef, useState } from "react";
import GetStarted from "./authComponent/GetStarted";
import PostJob from "./employers_page/PostJob";
import ResetPassword from "./authComponent/ResetPassword";
import VerifyEmail from "./authComponent/VerifyEmail";
import MsgBox from "./authComponent/MsgBox";
import { Provider } from "react-redux";
import { store } from "./ReduxStore/store";
import JobId from "./Reuseables/JobId";
import SearchResult from "./SearchPage/SearchResult";
import ApplyPage from "./User_pages/ApplyPage";
import EmailTemplate from "./utils/EmailTemplate";
// import { io } from "socket.io-client";
// import Button from "./Reuseables/Button";

interface userContextTypes {
  toggleSideNav: RefObject<HTMLDivElement>;
  inputErr: string;
  setinputErr: React.Dispatch<React.SetStateAction<string>>;
}
export let ContextApi: Context<userContextTypes>;
function App({}) {
  const [inputErr, setinputErr] = useState<string>("");
  const toggleSideNav = useRef<HTMLDivElement>(null);

  ContextApi = createContext({
    toggleSideNav: toggleSideNav,
    inputErr: inputErr,
    setinputErr: setinputErr,
  });

  // DO NOT DELETE //
  // const socket_connection = io("http://localhost:3000");

  // function join() {
  //   socket_connection.emit("join_room", inputValue);
  // }
  // function sendMsg() {
  //   socket_connection.emit("send_message", "Hello everyone",inputValue);
  // }
  // socket_connection.on("new_request", (param) => {
  //   console.log(param);
  // });

  return (
    <>
      <div className="p-0 m-0 box-border font-['poppins'] bg-[#f5f5f510] ">
        <Provider store={store}>
          <ContextApi.Provider
            value={{
              toggleSideNav,
              inputErr,
              setinputErr,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginAuth />} />
                <Route path="/signup" element={<CreateUser />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/direct-to-email" element={<MsgBox />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* <Route path="/change-password" element={<ChangePassword />} /> */}
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/job-id/:id" element={<JobId />} />
                <Route path="/search-result" element={<SearchResult />} />
                <Route path="/companies" element={<Community />} />
                <Route path="/getStarted" element={<GetStarted />} />
                <Route path="/apply-job" element={<ApplyPage />} />
                {/* Hire Routes */}
                <Route path="/employer-hire" element={<PostJob />} />
                <Route path="/review-application" element={<EmailTemplate />} />
              </Routes>
            </BrowserRouter>
          </ContextApi.Provider>
        </Provider>
        {/* <div className="flex gap-2">
          <input
            type="text"
            className="outline-1 border"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Button btn_text="join" handleClick={join} />
          <Button btn_text="message" handleClick={sendMsg} />
        </div> */}
      </div>
    </>
  );
}

export default App;
