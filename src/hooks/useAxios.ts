import { useMemo } from "react";
import axios from "axios";

const useAxios = () => {
  return useMemo(() => {
    return axios.create({
      baseURL: "https://api.leuteriorealty.com/lr/v1/public/api/",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  }, []);
};

export default useAxios;
