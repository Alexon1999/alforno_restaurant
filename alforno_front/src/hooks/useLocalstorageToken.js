import { useEffect } from "react";
import { setAuthToken } from "../utilities";

export default function useLocalStorageToken(
  key = "jwtToken",
  initialValue = null
) {
  const token = localStorage.getItem(key);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // console.log(axios.defaults.headers["Authorization"]);

  return token;
}
