import { axios } from "../../../lib/axios";
// import { ExtractFnReturnType } from "../../../lib/react-query";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TicketModel } from "../types";

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

export type UpdateTicketDTO = {
  data: {
    status: "doing" | "done";
    notes: string;
    work?: File;
  };
  ticketId: number;
};

export const updateTicket = ({
  data,
  ticketId,
}: UpdateTicketDTO): Promise<TicketModel> => {
  return axios
    .put(`/api/tickets/${ticketId}/`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        "x-csrftoken": getCookieValue("csrftoken"),
      },
    })
    .then((r) => r.data);
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTicket,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["ticket", data.id], data);
    },
    onError: () => {
      alert("error");
    },
  });
};
