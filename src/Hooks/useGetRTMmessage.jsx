// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from "../ReduxStore/ChatSlice.js";
// function useGetRTMmessage() {
//   const { socket } = useSelector((store) => store.socketio);
//   const { messages } = useSelector((store) => store.chat);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     socket?.on("newMessage", (newmsg) => {
//       dispatch(setMessages([...messages, newmsg]));
//     });
//     return () => {
//       socket?.off("newMessage");
//     };
//   }, [socket, dispatch]);
// }

// export default useGetRTMmessage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../ReduxStore/ChatSlice.js";
function useGetRTMmessage() {
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();
  const messagesRef = React.useRef([]);

  const messages = useSelector((store) => store.chat.messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const handleNewMessage = (newmsg) => {
      dispatch(setMessages([...messagesRef.current, newmsg]));
    };

    socket?.on("newMessage", handleNewMessage);
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]);
}
export default useGetRTMmessage;