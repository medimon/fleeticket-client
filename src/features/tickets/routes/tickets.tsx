import React, { useEffect, useState } from "react";
import { useTickets } from "../api/getTickets";
import { TicketModel } from "../types";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../lib/auth";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import TicketCard from "../components/ticketCard";
import StatusMenu from "../../../components/StatusMenu";
import { useSearchParams } from "react-router-dom";

export default function Tickets() {
  const [status, setStatus] = useState<"todo" | "doing" | "done">("todo");
  const ticketsQuery = useTickets(status);
  const [tickets, setTickets] = useState<TicketModel[]>();
  const navigate = useNavigate();
  // const [q] = useSearchParams()

  const user = useUser();

  useEffect(() => {
    setTickets(ticketsQuery.data);
  }, [ticketsQuery.data]);

  return (
    <Stack spacing={8}>
      <Helmet title="Fleeticket" />
      <Stack direction="row" spacing={6}>
        <StatusMenu selected={status} setSelected={setStatus} />
        {user.data?.role === "FR" && (
          <Button
            color="primary"
            variant="contained"
            fullWidth={false}
            onClick={() => navigate("new")}
          >
            Ajouter un ticket
          </Button>
        )}
      </Stack>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {tickets?.length === 0 && (
          <Typography mx="auto" variant="h3" color="text.secondary">
            Pas de tickets ici : /
          </Typography>
        )}
        {tickets?.map((t) => (
          <TicketCard
            key={t.id}
            id={t.id}
            title={t.title}
            description={t.description}
            deadline={t.deadline}
          />
        ))}
      </Box>
    </Stack>
  );
}
