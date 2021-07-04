import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { sendRequest } from "../utilities";
import useLocalStorageToken from "./useLocalstorageToken";

export default function useFetchCommandes(
  method,
  url,
  datas,
  shouldCalled = true,
  loop = false
) {
  const [commandes, setCommandes] = useState([]);
  const history = useHistory();
  const token = useLocalStorageToken();

  const fail_fn = () => {
    history.push("/login");
  };

  const fetchCommandes = async () => {
    const [data, error] = await sendRequest(method, url, datas, fail_fn);
    if (!error) {
      setCommandes(data);
    }
  };

  useEffect(() => {
    if (shouldCalled) {
      fetchCommandes();
    }

    return () => {
      setCommandes([]);
    };
  }, []);

  useEffect(() => {
    let timeoutId;
    function getLatestCommandes() {
      fetchCommandes();

      // wait for the response from fetchCommandes , before we recall it (delay of 1minute)
      timeoutId = setTimeout(getLatestCommandes, 1000 * 60);
    }

    if (loop) {
      getLatestCommandes();
    }

    return () => {
      clearTimeout(timeoutId);
      setCommandes([]);
    };
  }, []);

  return {
    commandes,
    setCommandes,
    fetchCommandes,
    fail_fn,
  };
}
