import React from "react";
// next-router
import { useRouter } from "next/router";
// mui
import { Typography } from "@mui/material";

export default function SidebarMenuOptions() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 justify-center h-full w-full">
      <Typography sx={{ cursor: "pointer" }} onClick={() => router.push("/")}>
        Overall
      </Typography>
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => router.push("/byboardgames")}
      >
        By Board Games
      </Typography>
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => router.push("/addstat")}
      >
        Add Stat
      </Typography>
    </div>
  );
}
