import React from "react";
import { Drawer } from "@mui/material";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SidebarDrawer({
  isOpen,
  onClose,
  children,
}: SidebarDrawerProps) {
  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", minWidth: "25vw" },
      }}
    >
      {children}
    </Drawer>
  );
}
