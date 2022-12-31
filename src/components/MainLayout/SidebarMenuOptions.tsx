import React from "react";
// jotai
import { useAtom } from "jotai";
import { isSidebarOpenAtom } from "src/store/MainLayoutStore";
// next-router
import { useRouter } from "next/router";
// mui
import { Typography } from "@mui/material";

export default function SidebarMenuOptions() {
  const [, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const router = useRouter();

  const handleMenuClick = (stringRoute: string) => {
    router.push(stringRoute);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 justify-center h-full w-full">
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => handleMenuClick("/")}
      >
        Overall
      </Typography>
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => handleMenuClick("/byboardgames")}
      >
        By Board Games
      </Typography>
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => handleMenuClick("/addstat")}
      >
        Add Stat
      </Typography>
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => handleMenuClick("/managestats")}
      >
        Manage Stats
      </Typography>
    </div>
  );
}
