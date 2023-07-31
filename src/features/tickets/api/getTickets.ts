import { axios } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { TicketModel } from "../types";

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

const getTickets = (status: string): Promise<TicketModel[]> => {
  return axios.get("/api/tickets", { params: { status } }).then((r) => r.data);
};

export const useTickets = (status: string) => {
  return useQuery<TicketModel[]>({
    queryKey: ["tickets", status],
    queryFn: () => getTickets(status),
  });
};
