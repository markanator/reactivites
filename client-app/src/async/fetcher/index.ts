import axios from "axios";
import { sleep } from "../../utils/sleeper";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.response.use(async (res) => {
  try {
    await sleep();
    return res;
  } catch (err) {
    console.warn(err);
    return await Promise.reject(err);
  }
});

export default instance;
