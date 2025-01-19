import axios from "axios";

export const getApi = () => {
  const url = "http://localhost:8000";

  const performRequest = async () => {
    return axios({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return { performRequest };
};
