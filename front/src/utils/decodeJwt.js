function decodeJwt(token) {
  let base64Url = token.split(".")[1];
  if (!base64Url) return null;
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  if (!jsonPayload) return null;
  const jsonData = JSON.parse(jsonPayload);
  if (!jsonData) return null;

  const now = Date.now();
  if (jsonData.type === "access" && jsonData.createdAt + 3600 * 1000 < now) {
    return "timeout";
  }
  if (
    jsonData.type === "refresh" &&
    jsonData.createdAt + 24 * 3600 * 1000 < now
  ) {
    return "timeout";
  }

  return jsonData;
}

export default decodeJwt;
