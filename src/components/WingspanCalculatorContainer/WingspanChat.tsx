import React from "react";
// types
import { WingspanChatMessage } from "src/@types/chat";

export interface WingspanChatProps {
  messages: WingspanChatMessage[];
}

export default function WingspanChat({ messages }: WingspanChatProps) {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{message.message}</div>
      ))}
    </div>
  );
}
