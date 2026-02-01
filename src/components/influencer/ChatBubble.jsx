export default function ChatBubble({ sender, text }) {
  return (
    <div className={sender === "me" ? "text-right" : "text-left"}>
      <span className="inline-block bg-gray-200 px-3 py-2 rounded">{text}</span>
    </div>
  );
}
