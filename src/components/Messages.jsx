import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GetAllMessages from "../Hooks/useGetAllMessages.jsx";
import useGetRTMmessage from "../Hooks/useGetRTMmessage.jsx";
import { CheckCheck, Check } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useSocket } from "../SocketContext.js";
function formatTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function Messages({ selectedUsers }) {
  useGetRTMmessage();
  GetAllMessages();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const socket = useSocket();
  const messagesEndRef = useRef(null);
 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={selectedUsers?.profilePicture} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span>{selectedUsers?.username}</span>
          <Link to={`/profile/${selectedUsers?._id}`}>
            <Button className="h-8 my-2" variant="secondary">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4">
        {messages
          ?.filter(
            (msg) =>
              (msg?.senderId === user?._id &&
                msg?.receiverId === selectedUsers?._id) ||
              (msg?.senderId === selectedUsers?._id &&
                msg?.receiverId === user?._id)
          )
          .map((msg) => {
            const isSender = msg.senderId === user._id;
            return (
              <div
                key={msg._id}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative p-2 rounded-lg max-w-xs break-words ${
                    isSender
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{msg?.messages}</span>
                    <div className="flex justify-end items-center gap-1 text-xs mt-1">
                      <span>{formatTime(msg.createdAt)}</span>
                      {isSender && (
                        <>
                          {msg.status === "sent" && (
                            <Check size={14} className="text-gray-300" />
                          )}
                          {(msg.status === "delivered" ||
                            msg.status === "seen") && (
                            <CheckCheck
                              size={14}
                              className={`transition-colors duration-300 ${
                                msg.status === "seen"
                                  ? "text-blue-300"
                                  : "text-white"
                              }`}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default Messages;
