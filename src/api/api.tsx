import axios from "axios";

const API_URL = "https://pinger-425411.lm.r.appspot.com";

export const postSignal = (idAddress: string) => {
  const response = axios.post(`${API_URL}/signal`, { ip: idAddress });
  return response;
};
