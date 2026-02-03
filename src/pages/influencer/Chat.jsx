import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageWrapper from "../../components/common/PageWrapper";
import { api } from "../../services/api";

export default function Chat({ tokens, setTokens }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef(null);
  const userId = Number(localStorage.getItem("userId"));

  const FREE_LIMIT = 5;
  const PAID_BLOCK_SIZE = 3;
  const BLOCK_COST = 5;

  const msgKey = `chat_msgs_${userId}_${id}`;
  const paidKey = `chat_paid_blocks_${userId}_${id}`;

  // ✅ LOAD MESSAGES + SEND AUTO MESSAGE ONLY IF EMPTY
  useEffect(() => {
    api(`/messages/${id}`).then(async (data) => {
      // If no messages exist, send default message ONCE
      if (data.length === 0) {
        await api("/messages", {
          method: "POST",
          body: JSON.stringify({
            chat_id: Number(id),
            sender_id: userId,
            text: "Hi, I’m interested in this campaign.",
          }),
        });

        // Reload messages after sending
        const updated = await api(`/messages/${id}`);
        setMessages(updated);

        localStorage.setItem(msgKey, 1);
        return;
      }

      // Normal case
      setMessages(data);

      const influencerCount = data.filter(
        (m) => m.sender_id === userId
      ).length;

      localStorage.setItem(msgKey, influencerCount);
    });
  }, [id, userId]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sentCount =
    Number(localStorage.getItem(msgKey)) || 0;

  const paidBlocks =
    Number(localStorage.getItem(paidKey)) || 0;

  const chargeableMsgs = Math.max(
    0,
    sentCount - FREE_LIMIT
  );

  const requiredBlocks = Math.floor(
    chargeableMsgs / PAID_BLOCK_SIZE
  );

  const handleSend = async () => {
    if (!input.trim() || sending) return;

    setSending(true);

    if (requiredBlocks > paidBlocks) {
      const tokenRes = await api(
        `/tokens/deduct?user_id=${userId}&amount=${BLOCK_COST}`,
        { method: "POST" }
      );

      if (tokenRes.error) {
        navigate("/influencer/no-tokens");
        return;
      }

      localStorage.setItem(paidKey, paidBlocks + 1);
      setTokens(tokenRes.tokens);
    }

    const msg = await api("/messages", {
      method: "POST",
      body: JSON.stringify({
        chat_id: Number(id),
        sender_id: userId,
        text: input,
      }),
    });

    const newCount = sentCount + 1;
    localStorage.setItem(msgKey, newCount);

    setMessages((prev) => [...prev, msg]);
    setInput("");
    setSending(false);
  };

  return (
    <PageWrapper>
      <div className="h-[calc(100vh-64px)] bg-slate-950 flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-blue-400">
              Conversation
            </h2>
            <p className="text-xs text-slate-400">
              {sentCount < FREE_LIMIT
                ? `${FREE_LIMIT - sentCount} free messages left`
                : `5 tokens per ${PAID_BLOCK_SIZE} messages`}
            </p>
          </div>

          <div className="text-xs bg-blue-500/15 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
            {tokens} Tokens
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 px-6 py-4 overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-sm px-4 py-2 rounded-2xl text-sm
                ${
                  m.sender_id === userId
                    ? "ml-auto bg-blue-500 text-white"
                    : "mr-auto bg-slate-800 text-slate-200"
                }
              `}
            >
              {m.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="px-6 py-4 border-t border-slate-800 flex gap-3 bg-slate-950">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          />
          <button
            onClick={handleSend}
            disabled={sending}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-xl transition active:scale-95 disabled:opacity-60"
          >
            Send
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
