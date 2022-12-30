import React, { useState } from "react";
// components
import SidebarDrawer from "./SidebarDrawer";
// mui
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// custom hook
import useFirebaseAuth from "src/hooks/useFirebaseAuth";
import SidebarMenuOptions from "./SidebarMenuOptions";

export default function TopNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout } = useFirebaseAuth();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon onClick={() => setIsDrawerOpen(true)} />
            </IconButton>
            <Typography>Who will rule the world?</Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{ color: "white" }}
            onClick={() => logout()}
          >
            Logout
          </Button>
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
