import React from "react";

export interface Messages {
  chatID: string;
  content: string;
  id: string;
  sender: string;
  timestamp: string;
}

type Props = {
  List: Messages[];
};

const MessageList = (props: Props) => {
  const ToEST = (timestamp: string) => {
    const options = { timeZone: "America/New_York" };
    return new Date(timestamp).toLocaleString("en-US", options);
  };

  if (props.List.length === 0) {
    return <div className="text-3xl">No Messages</div>;
  }

  return (
    <>
      {props.List.map((msg, index) => (
        <div key={index} className="pb-4">
          <div className="text-red-400 text-lg">
            {msg.sender}
            <span className="pl-4 text-[#858a87] whitespace-pre-line text-sm">
              {ToEST(msg.timestamp)}
            </span>
          </div>
          <span className="whitespace-pre-line text-lg">{msg.content} </span>
        </div>
      ))}
    </>
  );
};

export default MessageList;
