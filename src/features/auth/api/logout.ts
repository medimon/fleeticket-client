import { axios } from "../../../lib/axios";

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

export const logout = (): Promise<any> => {
  return axios
    .post(
      "api/logout/",
      {},
      {
        headers: {
          "x-csrftoken": getCookieValue("csrftoken"),
        },
      }
    )
    .then((r) => r.data);
};
