import { Navigate, Outlet } from "react-router-dom";
import Tickets from "../features/tickets/routes/tickets";
import Ticket from "../features/tickets/routes/ticket";
import { MainLayout } from "../components/layout";
import AddTicket from "../features/tickets/routes/addTicket";

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/new", element: <AddTicket /> },
      {
        path: "/:id",
        element: <Ticket />,
      },
      {
        path: "/",
        element: <Tickets />,
      },
      { path: "/login", element: <Navigate to="/" /> },
    ],
  },
];
