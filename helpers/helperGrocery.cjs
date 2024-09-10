function groceryCredentials() {
  const baseurl = "https://simple-grocery-store-api.glitch.me";
  const randomClientName =
    "John" + Math.floor(Math.random() * 100 + 10) + Date.now();
  const randomEmail =
    "John" + Math.floor(Math.random() * 100 + 10) + Date.now() + "@gmail.com";
  const authbody = {
    clientName: randomClientName,
    clientEmail: randomEmail,
  };

  const response = {
    baseurl: baseurl,
    authbody: authbody,
  };
  return response;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getStatusCodes() {
  return {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    NO_CONTENT: 204,
  };
}

module.exports = {
  groceryCredentials,
  delay,
  getStatusCodes,
};
