import axios from "axios";

const request = axios.create({
  headers: { "Content-Type": "application/json" },
  transformResponse: [(res) => JSON.parse(res)],
});
const token = localStorage.getItem("token");
axios.defaults.headers = {
  Authorization: `Bearer ${token}`,
};

request.defaults.baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1"
    : "http://api.crmviagens.com/api/v1";
// request.defaults.baseURL = "http://api.crmviagens.com/api/v1";

export default request;
