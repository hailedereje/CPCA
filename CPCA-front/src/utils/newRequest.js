import axios from "axios";

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
const newRequests = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});

export default newRequests;
