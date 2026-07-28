// http://localhost:8080/api
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function http(url, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  //  raw body
  let body = options.body;
  if (body && typeof body === "object") {
    body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    body,
  });

  // 4. First-level interception: Physical errors at the network or server level (such as 404/500/gateway timeout).
  if (!response.ok) {
    throw new Error(
      `Network connection failed! HTTP status code: ${response.status}`,
    );
  }

  // 5. Second-level interception: Parsing the JSON structure uniformly returned by the backend.
  const result = await response.json();

  if (result.responseCode !== 200) {
    const error = new Error(result.message || "backend service error");
    error.code = result.responseCode;
    error.data = result.data;
    throw error;
  }

  // response successful
  return result.data;
}
