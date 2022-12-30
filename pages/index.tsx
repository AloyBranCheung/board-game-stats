// components
import PieChart from "src/components/Charts/PieChart";
// mui
import { Card, Box, Container, Typography } from "@mui/material";

export default function Home() {
  const data = {
    labels: ["Brandon", "Tricia"],
    datasets: [
      {
        label: "Win/Loss Ratio",
        data: [1.5, 0.6],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container sx={{ padding: "1.25rem 0" }}>
      <Card
        sx={{
          padding: "1.25rem",
        }}
      >
        <Typography sx={{ marginBottom: "1.25rem" }} variant="h5">
          Overall Win/Loss Ratio
        </Typography>
        <Box
          width="100%"
          maxHeight="35vh"
          display="flex"
          justifyContent="center"
        >
          <PieChart data={data} />
        </Box>
      </Card>
    </Container>
  );
}
