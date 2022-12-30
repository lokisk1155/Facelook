export function storeCSRFToken(response) {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export async function restoreCSRF() {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  return response;
}

async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};
  options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");

  if (
    options.method.toUpperCase() !== "GET" &&
    !(options.body instanceof FormData)
  ) {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
  }

  const res = await fetch(url, options);
  if (res.status >= 400) throw res;
  else return res;
}

export default csrfFetch;
