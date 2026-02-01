import { NavLink } from "react-router-dom";
import TokenBadge from "../influencer/TokenBadge";

export default function InfluencerNavbar({ tokens }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="font-bold text-blue-600">Influencer Panel</h1>

      <div className="flex gap-6 items-center text-sm">
        <NavLink to="/influencer">Dashboard</NavLink>
        <NavLink to="/influencer/chats">My Chats</NavLink>
        <TokenBadge tokens={tokens} />

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="text-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
