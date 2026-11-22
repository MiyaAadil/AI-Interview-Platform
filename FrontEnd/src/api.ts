const API_URL = import.meta.env.VITE_API_URL;

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  // Expired or invalid token while logged in → back to the login screen
  if (res.status === 401 && token) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }

  if (!res.ok) {
    let message = "Something went wrong";
    if (typeof data.error === "string") {
      message = data.error;
    } else if (Array.isArray(data.error)) {
      message = data.error.map((issue: { message?: string }) => issue.message).join(", ");
    }
    throw new Error(message);
  }

  return data as T;
}