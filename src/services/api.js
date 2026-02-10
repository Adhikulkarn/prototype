const BASE_URL = "https://prototype-1-xfok.onrender.com";

export async function api(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    // 🔥 THIS IS THE KEY
    throw new Error(data.detail || data.error || "API error");
  }

  return data;
}
