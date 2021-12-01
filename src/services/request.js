import axios from "axios";

const request = axios.create({
  headers: { "Content-Type": "application/json" },
  transformResponse: [(res) => JSON.parse(res)],
});

request.defaults.baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1"
    : "http://api.crmviagens.com/api/v1";
// request.defaults.baseURL = "http://api.crmviagens.com/api/v1";

export default request;
