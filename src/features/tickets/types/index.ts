import { AuthUser } from "../../auth";

export type TicketModel = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  notes: string;
  deadline: string;
  work: string;
  user: AuthUser;
};
