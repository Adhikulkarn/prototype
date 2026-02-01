import { useNavigate } from "react-router-dom";

export default function CampaignDetails({ tokens, setTokens }) {
  const navigate = useNavigate();

  const contact = () => {
    if (tokens < 50) return navigate("/influencer/no-tokens");
    setTokens(t => t - 50);
    navigate("/influencer/chat/1");
  };

  return (
    <div className="p-6">
      <h2>Campaign Details</h2>
      <button onClick={contact}>Contact Vendor (50 tokens)</button>
    </div>
  );
}
