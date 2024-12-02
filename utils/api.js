import axios from "axios";

const api = axios.create({
  baseURL: "https://rf-print-work-be.onrender.com/api",
});

export function fetchTop100Albums() {
  return api.get("/albums")
}