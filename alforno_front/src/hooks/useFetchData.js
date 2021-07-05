import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { sendRequest } from "../utilities";
import useLocalStorageToken from "./useLocalstorageToken";

export default function useFetchData(method, url, datas) {
  const history = useHistory();
  const token = useLocalStorageToken();
  const [fetchedData, setFetchedData] = useState([]);

  const fail_fn = () => history.push("/login");

  useEffect(() => {
    const fetch_data = async () => {
      const [data, error] = await sendRequest(method, url, datas, fail_fn);
      if (!error) {
        setFetchedData(data);
      }
    };

    fetch_data();

    return () => {
      setFetchedData([]);
    };
  }, []);

  return [fetchedData, setFetchedData, fail_fn];
}
