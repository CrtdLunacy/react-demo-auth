import axios from "axios";
import { useState } from "react";
import { ExternalData } from "../pages/CommandPage";

export const useUserData = (page: number) => {
  const [data, setData] = useState<ExternalData[]>([])
    axios.get(`https://reqres.in/api/users?page=${page}`)
    .then(function (response) {
      setData([...data, ...response.data.data]);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

  return [data];
}
