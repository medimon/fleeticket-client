// import React from "react";
import { useLogout, useUser } from "../lib/auth";
import storage from "../utils/storage";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const user = useUser();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h3"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            color="primary"
            onClick={() => navigate("/")}
          >
            FLEETICKET
          </Typography>
          <Typography variant="h6" component="div">
            {`${user.data?.firstName} ${user.data?.lastName}`}
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mx: 2 }}
            onClick={() => logoutMutation.mutateAsync({})}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
