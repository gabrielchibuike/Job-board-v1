import React, { useEffect, useState } from "react";
import Button from "../Reuseables/Button";
import { io } from "socket.io-client";

const SocketTesting = () => {
  const socket = io("http://localhost:3000");
  const [message, setMessage] = useState("");
  const [Room, setRoom] = useState("");
  const [MessageReceived, setMessageReceived] = useState("");
  useEffect(() => {
    socket.on("new_request", (arg: string) => {
      setMessageReceived(arg);
    });
  }, [socket]);
  return (
    <>
      <div>
        <label htmlFor="">
          <input
            type="text"
            className="w-[300px] h-10"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <Button
            btn_text="Join Room"
            handleClick={() => {
              //
              // Reciving action from server
              if (Room !== "") {
                socket.emit("join_room", Room);
              }
            }}
          />
        </label>
        <label htmlFor="">
          <input
            type="text"
            className="w-full h-10"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <Button
            btn_text="Send Message"
            handleClick={() => {
              //
              // Reciving action from server

              socket.emit("send_message", { message, Room });
            }}
          />
        </label>
        <p>MessageReceived</p>
        {MessageReceived}
      </div>
    </>
  );
};

export default SocketTesting;
