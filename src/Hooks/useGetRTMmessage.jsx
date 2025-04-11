
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../ReduxStore/ChatSlice.js";
import {useSocket } from "../SocketContext.js";
function useGetRTMmessage() {
  const socket = useSocket();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const messages = useSelector((store) => store.chat.messages);
  const messagesRef = useRef([]);

  useEffect(() => {
    messagesRef.current = messages; 
  }, [messages]);

  useEffect(() => {
    if (!socket || !user) return;

    const handleNewMessage = (newmsg) => {
      dispatch(setMessages([...messagesRef.current, newmsg]));
      // ✅ Emit delivered only if current user is the receiver and status is 'sent'
      if (newmsg.receiverId === user._id && newmsg.status === "sent") {
        socket.emit("message-delivered", newmsg._id);
      }
    };

    const handleStatusUpdate = (updatedMsg) => {
      const updatedMessages = messagesRef.current.map((msg) =>
        msg._id === updatedMsg._id ? updatedMsg : msg
      );
      dispatch(setMessages(updatedMessages));
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("message-status-updated", handleStatusUpdate);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("message-status-updated", handleStatusUpdate);
    };
  }, [socket, dispatch, user]);
}

export default useGetRTMmessage;