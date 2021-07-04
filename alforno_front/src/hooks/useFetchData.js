import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { sendRequest } from "../utilities";

export default function useFetchData(method, url, datas) {
  const history = useHistory();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetch_data = async () => {
      const [data, error] = await sendRequest(method, url, datas, () =>
        history.push("/login")
      );
      if (!error) {
        setFetchedData(data);
      }
    };

    fetch_data();

    return () => {
      setFetchedData([]);
    };
  }, []);

  return [fetchedData, setFetchedData];
}
