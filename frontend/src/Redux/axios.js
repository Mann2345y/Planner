import axios from "axios";

const baseURL = "http://localhost:5000";
let headers = {};
const user = JSON.parse(localStorage.getItem("user"));
if (localStorage.getItem("user")) {
  headers.Authorization = `Bearer ${user.token}`;
}
export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});
