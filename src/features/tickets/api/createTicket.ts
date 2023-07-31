import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

export type CreateTicketDto = {
  data: {
    title: string;
    description: string;
    deadline: Date;
  };
};

// export type CreateTicketResponse = {

// }

export const createTicket = ({ data }: CreateTicketDto) => {
  return axios.post(
    `/api/tickets/`,
    { ...data, deadline: data.deadline.toLocaleDateString() },
    {
      withCredentials: true,
      headers: {
        "x-csrftoken": getCookieValue("csrftoken"),
      },
    }
  );
};

export const useCreateTicket = () => {
  return useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      alert("opération achevée!");
    },
    onError: () => {
      alert("une erreur s'est produite");
    },
  });
};
