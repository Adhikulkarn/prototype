import { useState } from "react";
import ChatBubble from "../../components/influencer/ChatBubble";

export default function Chat({ tokens, setTokens }) {
  const [messages, setMessages] = useState([]);

  const send = () => {
    if (tokens <= 0) return;
    setTokens(t => t - 5);
    setMessages([...messages, { sender: "me", text: "Hello!" }]);
  };

  return (
    <div className="p-6">
      {messages.map((m, i) => <ChatBubble key={i} {...m} />)}
      <button onClick={send}>Send (5 tokens)</button>
    </div>
  );
}
