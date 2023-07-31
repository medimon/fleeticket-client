import React, { ChangeEvent, useEffect, useState } from "react";
import { useTickets } from "../api/getTickets";
import { TicketModel } from "../types";
import { useTicket } from "../api/getTicket";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import { useUser } from "../../../lib/auth";
import { useUpdateTicket } from "../api/updateTicket";
import { Helmet } from "react-helmet-async";
import { CalendarMonth, CalendarMonthOutlined } from "@mui/icons-material";

export default function Ticket() {
  const { id = "" } = useParams();
  const ticketQuery = useTicket(+id);
  const [ticket, setTicket] = useState<TicketModel>();
  const [notes, setNotes] = useState<string>("");
  const ticketMutation = useUpdateTicket();
  const user = useUser();
  const [file, setFile] = useState<File>();
  const navigate = useNavigate();

  useEffect(() => {
    if (ticketQuery.data) setTicket(ticketQuery.data);
  }, [ticketQuery.data]);

  useEffect(() => {
    if (ticket && ticket.notes) setNotes(ticket.notes);
  }, [ticket?.notes]);

  const handleClick = () => {
    ticketMutation.mutate({
      data: { status: "doing", notes: notes },
      ticketId: +id,
    });
  };

  const handleSendClick = () => {
    if (!file) {
      alert("Veuillez inclure un fichier");
      return;
    }
    ticketMutation.mutate({
      data: { status: "done", notes: notes, work: file },
      ticketId: +id,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <Helmet title={`Fleeticket | ${ticket?.title}`} />

      <Stack spacing={12} sx={{ maxWidth: "md" }} mx="auto">
        <Stack spacing={2}>
          <h1>{ticket?.title}</h1>
          <Stack direction="row" justifyContent="space-between">
            <span>{ticket?.deadline}</span>
            <strong>
              <Chip label={ticket?.status} variant="outlined" color="primary" />
            </strong>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {ticket?.description}
          </Typography>

          {user.data?.role == "DZ" && ticket?.status == "todo" && (
            <Button color="primary" variant="contained" onClick={handleClick}>
              Prendre ce ticket
            </Button>
          )}
        </Stack>
        <Divider />
        <Stack spacing={2}>
          {user.data?.role == "DZ" && ticket?.status == "doing" && (
            <>
              <TextField
                label="Notes"
                multiline
                rows={6}
                maxRows={9}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <Button component="label">
                Upload
                <input
                  type="file"
                  onChange={handleFileChange}
                  hidden
                  accept=".zip, .rar, .7zip"
                />
                <div>{file && `${file.name} - ${file.type}`}</div>
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSendClick}
              >
                envoyer
              </Button>
            </>
          )}
          {user.data?.role == "DZ" && ticket?.status == "done" && (
            <>
              <Typography variant="body2" color="text.secondary">
                {notes}
              </Typography>
              <Button component={Link} to={ticket?.work} color="primary">
                download
              </Button>
            </>
          )}
          {user.data?.role == "FR" && ticket?.status == "done" && (
            <>
              <Typography variant="body2" color="text.secondary">
                {notes}
              </Typography>
              <Button component={Link} to={ticket?.work} color="primary">
                download
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </div>
  );
}
