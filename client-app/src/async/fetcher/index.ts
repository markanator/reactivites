import { useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { store } from "~/stores/store";
import { sleep } from "../../utils/sleeper";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.response.use(
  async (res) => {
    try {
      await sleep();
      return res;
    } catch (err) {
      console.warn(err);
      return await Promise.reject(err);
    }
  },
  (err: AxiosError<any>) => {
    const { data, status } = err.response!;
    switch (status) {
      case 400:
        if (data?.errors) {
          const modalStateError = [];
          for (const key in data?.errors) {
            if (data.errors[key]) {
              modalStateError.push(data.errors[key]);
            }
          }
          throw modalStateError.flat();
        } else {
          window?.toast({
            status: "error",
            title: "Bad request, try again later.",
            position: "bottom-right",
          });
        }
        break;
      case 401:
        window?.toast({
          status: "error",
          title: "Unauthorized, please login.",
          position: "bottom-right",
        });
        break;
      case 404:
        window?.navigate("/not-found");
        break;
      case 500:
        store.commentStore.setServerError(data);
        window?.navigate("/server-error");
        break;
    }
    return Promise.reject(err);
  }
);

export default instance;
