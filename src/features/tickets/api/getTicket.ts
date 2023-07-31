import { axios } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TicketModel } from "../types";

export const getTicket = (id: number): Promise<TicketModel> => {
  return axios.get(`/api/tickets/${id}`).then((r) => r.data);
};

export const useTicket = (id: number) => {
  return useQuery<TicketModel>({
    queryKey: ["ticket", id],
    queryFn: () => getTicket(id),
  });
};
