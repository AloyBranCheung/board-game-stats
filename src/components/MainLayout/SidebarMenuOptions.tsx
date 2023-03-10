import React from "react";
// jotai
import { useAtom } from "jotai";
import { isSidebarOpenAtom } from "src/store/MainLayoutStore";
// next-router
import { useRouter } from "next/router";
// mui
import { Typography, Button } from "@mui/material";
// config
import menuOptions, { MenuOptions } from "./sidebarMenuConfig";

export default function SidebarMenuOptions() {
  const [, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const router = useRouter();

  const handleMenuClick = (stringRoute: string) => {
    router.push(stringRoute);
    setIsSidebarOpen(false);
  };

  const menuItems = menuOptions.map(({ name, route }: MenuOptions) => (
    <Button key={route}>
      <Typography
        sx={{ cursor: "pointer", width: "100%" }}
        onClick={() => handleMenuClick(route)}
      >
        {name}
      </Typography>
    </Button>
  ));

  return (
    <div className="flex flex-col gap-5 justify-center h-full w-full">
      {menuItems}
    </div>
  );
}
