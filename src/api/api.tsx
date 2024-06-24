import axios from "axios";

const API_URL = "https://pinger-425411.lm.r.appspot.com";

export const postSignal = (idAddress: string) => {
  const response = axios.post(`${API_URL}/signal`, { ip: idAddress });
  return response;
};

interface Tracking {
  ip: string;
  from: string;
  to: string;
}

export const getTracking = ({ ip, from, to }: Tracking) => {
  const response = axios.get(`${API_URL}/tracking`, {
    params: {
      ip,
      from,
      to,
    },
  });
  return response;
};
export const getToggleTracking = ({ address }: { address: string }) => {
  const response = axios.get(`${API_URL}/toogle-tracking`, {
    params: {
      address,
    },
  });
  return response;
};

export const postToggleTracking = ({
  address,
  isTracking,
}: {
  address: string;
  isTracking: boolean;
}) => {
  const response = axios.post(`${API_URL}/toogle-tracking`, {
    ip: address,
    isTracking,
  });
  return response;
};
