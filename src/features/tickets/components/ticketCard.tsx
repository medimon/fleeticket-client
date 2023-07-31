import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  deadline: string;
  description: string;
}

export default function TicketCard({
  id,
  title,
  deadline,
  description,
}: Props) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`${id}`)}
      sx={{ cursor: "pointer", background: "#ffffff11" }}
      elevation={6}
    >
      {/* <CardActionArea> */}
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {deadline}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.length > 350
            ? `${description.slice(0, 350)}...`
            : description}
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}
