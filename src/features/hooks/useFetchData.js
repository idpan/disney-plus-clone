import { useEffect, useState } from "react";
import axios from "axios";
function useFetchData(fetchUrl) {
  const [data, setData] = useState(null);

  const fetchData = async (fetchUrl) => {
    const res = await axios.get(fetchUrl);
    const result = res.data.results;
    setData(result);
  };
  useEffect(() => {
    fetchData(fetchUrl);
  }, []);

  return data;
}

export default useFetchData;
