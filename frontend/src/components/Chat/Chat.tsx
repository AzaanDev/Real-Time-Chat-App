import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { Chat } from "../../store/reducers/ChatSlice";
import { AiTwotoneCloud } from "react-icons/ai";
import socket from "../../socket/socket";
import { GetMessages, SendMessage } from "../../api/api";
import MessageList, { Messages } from "./MessageList";

const ChatPage = () => {
  const currentIndex = useSelector(
    (state: RootState) => state.Chat.currentChat
  );
  const chats = useSelector((state: RootState) => state.Chat.chats);
  const Id = useSelector((state: RootState) => state.Auth.user_id);
  const username = useSelector((state: RootState) => state.Auth.name);

  const [messages, setMessages] = useState<Messages[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat>();
  const [sendMessage, setSendMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (currentIndex !== undefined) {
      socket.disconnect();
      const currentChat = chats[currentIndex];
      setCurrentChat(currentChat);
      socket.auth = {
        userID: Id,
        currentChatID: currentChat.id,
      };
      socket.connect();
      socket.on("message", (message) => {
        // Handle the received message here
        addMessage(message);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [currentIndex]);

  useEffect(() => {
    const Message = async () => {
      if (currentIndex !== undefined) {
        const currentChat = chats[currentIndex];
        var r = await GetMessages(currentChat.id);
        setMessages(r);
      }
    };

    Message();
  }, [currentIndex]);

  const addMessage = (newMessage: Messages) => {
    setMessages((prevMessages: Messages[]) => [...prevMessages, newMessage]);
  };

  const handleMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setSendMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (sendMessage.trim() !== "") {
      setSendMessage("");
    }
  };

  const adjustTextareaHeight = () => {
    if (divRef.current && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = textareaRef.current.scrollHeight + "px";
      divRef.current.style.height = newHeight;
      textareaRef.current.style.height = newHeight;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [sendMessage]);

  useEffect(() => {
    const onSendMessage = async () => {
      if (currentChat?.id !== undefined && username !== null) {
        const currentTime = new Date();
        const utcTimeString = currentTime.toUTCString();
        const payload: Messages = {
          chatID: currentChat?.id,
          sender: username,
          content: sendMessage,
          timestamp: utcTimeString,
          id: "",
        };
        addMessage(payload);
        const payloadString = JSON.stringify(payload);
        socket.emit("message", payload);
        await SendMessage(payloadString);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.target === textareaRef.current) {
        e.preventDefault();
        if (sendMessage.trim() !== "") {
          onSendMessage();
          setSendMessage("");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sendMessage]);

  if (currentIndex === undefined || currentChat === undefined) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1">
        <header
          className="flex h-10 items-center px-4 bg-primary gap-4 fixed shadow-md"
          style={{ width: "calc(100vw - 5rem)" }}
        >
          <AiTwotoneCloud size={40} />
          <h1 className="text-xl">{currentChat.name}</h1>
          <div className="flex-grow"></div>
        </header>

        <main className="flex-1 bg-secondary flex flex-col-reverse overflow-y-auto pl-3">
          <div className="mb-3">
            <MessageList List={messages} />
          </div>
        </main>

        <footer
          className="h-14 bg-primary flex items-center justify-center"
          ref={divRef}
        >
          <form onSubmit={handleSendMessage} className="w-3/4 mt-2">
            <textarea
              ref={textareaRef}
              className="w-full bg-secondary text-white resize-none rounded-md outline-none p-2"
              value={sendMessage}
              onChange={handleMessageChange}
              placeholder={`Send a message to ${currentChat.name}...`}
              rows={1}
            />
          </form>
        </footer>
      </div>
    </div>
  );
};

export default ChatPage;
