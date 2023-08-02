import { axios } from "../../../lib/axios";
import { UserResponse } from "../types";

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return axios
    .post(
      `/api/login/`,
      { username: data.username, password: data.password },
      {
        withCredentials: true,
        headers: {
          "x-csrftoken": getCookieValue("csrftoken"),
        },
      }
    )
    .then((r) => r.data)
    .catch((e) => alert("mauvaise combinaison username/mot de passe"));
};
