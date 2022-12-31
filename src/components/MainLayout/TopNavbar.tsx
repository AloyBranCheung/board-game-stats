import React, { useState } from "react";
// jotai
import { useAtom } from "jotai";
import { isSidebarOpenAtom } from "src/store/MainLayoutStore";
// components
import SidebarDrawer from "./SidebarDrawer";
import PrimaryButton from "../UI/PrimaryButton";
// mui
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// custom hook
import useFirebaseAuth from "src/hooks/useFirebaseAuth";
import SidebarMenuOptions from "./SidebarMenuOptions";

export default function TopNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useAtom(isSidebarOpenAtom);
  const { logout } = useFirebaseAuth();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Box>
      <AppBar position={trigger ? "fixed" : "static"}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={() => setIsDrawerOpen(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography>Who will rule the world?</Typography>
          </Box>
          <PrimaryButton onClick={() => logout()}>
            <Typography>Logout</Typography>
          </PrimaryButton>
        </Toolbar>
      </AppBar>
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <SidebarMenuOptions />
      </SidebarDrawer>
    </Box>
  );
}
