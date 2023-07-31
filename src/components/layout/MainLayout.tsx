import React, { useState } from "react";
import Topbar from "../Topbar";
import { Box } from "@mui/material";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="app">
      <main className="content">
        <Topbar />
        <Box my={6} mx={{ xs: 1, sm: 3, md: 6 }}>
          {children}
        </Box>
      </main>
    </div>
  );
};
