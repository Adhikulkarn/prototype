import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/common/PageWrapper";
import { api } from "../../services/api";

export default function MyChats() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    api(`/chats/user/${userId}`)
      .then(setChats)
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-950 px-6 py-12">

        {/* HEADER */}
        <div className="max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl font-semibold tracking-wide text-blue-400">
            My Chats
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Your conversations with brands
          </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-slate-400 py-20 animate-pulse">
              Loading chats...
            </div>
          ) : chats.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
              <h2 className="text-lg font-medium text-white">
                No chats yet
              </h2>
              <p className="text-slate-400 mt-2">
                Contact a vendor to start chatting.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {chats.map((chat, index) => (
                <div
                  key={chat.id}
                  onClick={() =>
                    navigate(`/influencer/chat/${chat.id}`)
                  }
                  className="
                    bg-slate-800
                    border border-slate-700
                    rounded-2xl
                    p-6
                    cursor-pointer
                    transition-all duration-500
                    hover:-translate-y-1
                    hover:bg-slate-700
                    hover:border-blue-500/40
                    hover:shadow-xl hover:shadow-blue-500/15
                    animate-fadeIn
                  "
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium tracking-wide">
                        Campaign #{chat.campaign_id}
                      </p>
                      <p className="text-sm text-slate-300 mt-1">
                        Click to open conversation
                      </p>
                    </div>

                    <span className="text-blue-400 text-sm font-medium">
                      Open →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
