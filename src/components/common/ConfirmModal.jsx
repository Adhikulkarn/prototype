import { NavLink } from "react-router-dom";
import TokenBadge from "../influencer/TokenBadge";

export default function Navbar({ tokens }) {
  return (
    <div className="flex justify-between px-6 py-4 bg-white shadow">
      <h1 className="font-bold text-lg">Influencer–Vendor Platform</h1>
      <div className="flex gap-4 items-center">
        <NavLink to="/influencer">Influencer</NavLink>
        <NavLink to="/vendor">Vendor</NavLink>
        <TokenBadge tokens={tokens} />
      </div>
    </div>
  );
}
