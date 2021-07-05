import axios from "axios";
import { apiUrl } from "./config";

const instance = axios.create({
  baseURL: apiUrl,
});

export default instance;
