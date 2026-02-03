import { useEffect, useState } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import { api } from "../../services/api";

export default function InfluencerProfile() {
  const userId = Number(localStorage.getItem("userId"));

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    niche: "",
    followers_range: "",
    engagement: "",
    content_types: [],
    bio: "",
    availability: "Open",
  });

  useEffect(() => {
    api(`/profile/${userId}`)
      .then((data) => {
        if (data) {
          setProfile(data);
          setIsSaved(true);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const toggleContentType = (type) => {
    setProfile((prev) => ({
      ...prev,
      content_types: prev.content_types.includes(type)
        ? prev.content_types.filter((t) => t !== type)
        : [...prev.content_types, type],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await api("/profile", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, ...profile }),
    });
    setSaving(false);
    setIsSaved(true);
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 animate-pulse">
          Loading profile...
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-14">

        <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-10 shadow-2xl shadow-blue-500/20 animate-fadeIn">

          {/* HEADER */}
          <div className="mb-10 border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-semibold text-blue-400">
              My Profile
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              This is how vendors see you
            </p>
          </div>

          {isSaved ? (
            /* ================= VIEW MODE ================= */
            <div className="space-y-10">

              <section className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white">
                  {profile.name}
                </h2>
                <p className="text-slate-400 mt-1">
                  {profile.niche} Creator
                </p>
              </section>

              <section className="grid sm:grid-cols-2 gap-6">
                {[
                  ["Followers", profile.followers_range],
                  ["Engagement", profile.engagement],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="bg-slate-800/70 rounded-2xl p-5 border border-slate-700"
                  >
                    <p className="text-xs text-slate-400 uppercase">
                      {label}
                    </p>
                    <p className="text-white font-medium mt-1">
                      {value}
                    </p>
                  </div>
                ))}
              </section>

              <section className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">
                <p className="text-slate-300 font-medium mb-3">
                  Content Types
                </p>
                <div className="flex flex-wrap gap-3">
                  {profile.content_types.map((type) => (
                    <span
                      key={type}
                      className="px-4 py-1.5 rounded-full text-sm bg-blue-600/20 text-blue-300 border border-blue-500/30"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </section>

              <section className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">
                <p className="text-slate-300 font-medium mb-2">
                  About
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {profile.bio || "—"}
                </p>
              </section>

              <section className="bg-green-600/10 border border-green-500/30 rounded-2xl p-4 text-green-300 text-sm">
                Status: {profile.availability}
              </section>

              <button
                onClick={() => setIsSaved(false)}
                className="text-blue-400 hover:text-blue-300 transition text-sm"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            /* ================= EDIT MODE ================= */
            <div className="space-y-8">

              {/* FORM CARD */}
              <section className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700 space-y-6">

                {/* INPUT */}
                <div>
                  <label className="text-slate-300 text-sm mb-1 block">
                    Display Name
                  </label>
                  <input
                    value={profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="
                      w-full
                      bg-slate-900
                      border border-slate-600
                      p-3
                      rounded-xl
                      text-slate-200
                      transition
                      focus:border-blue-500
                      focus:ring-2 focus:ring-blue-500/40
                      outline-none
                    "
                  />
                </div>

                {/* SELECTS */}
                {[
                  ["Primary Niche", "niche", ["Lifestyle","Fashion","Fitness","Tech","Beauty"]],
                  ["Followers Range", "followers_range", ["1k–10k","10k–50k","50k–100k","100k+"]],
                  ["Engagement Level", "engagement", ["High","Medium","Low"]],
                ].map(([label, field, options]) => (
                  <div key={field}>
                    <label className="text-slate-300 text-sm mb-1 block">
                      {label}
                    </label>
                    <select
                      value={profile[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="
                        w-full
                        bg-slate-900
                        border border-slate-600
                        p-3
                        rounded-xl
                        text-slate-200
                        transition
                        focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/40
                        outline-none
                      "
                    >
                      <option value="">Select</option>
                      {options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </section>

              {/* CONTENT TYPES */}
              <section className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">
                <p className="text-slate-300 mb-3">Content Types</p>
                <div className="flex flex-wrap gap-3">
                  {["Reels", "Shorts", "Posts", "Stories"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleContentType(type)}
                      className={`
                        px-4 py-2 rounded-xl border transition
                        ${
                          profile.content_types.includes(type)
                            ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/30"
                            : "bg-slate-900 text-slate-300 border-slate-600 hover:bg-slate-800"
                        }
                      `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </section>

              {/* BIO */}
              <section className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700">
                <label className="text-slate-300 text-sm mb-1 block">
                  Short Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  rows={3}
                  className="
                    w-full
                    bg-slate-900
                    border border-slate-600
                    p-3
                    rounded-xl
                    text-slate-200
                    transition
                    focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/40
                    outline-none
                  "
                />
              </section>

              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/40 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
