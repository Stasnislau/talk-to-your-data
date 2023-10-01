import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
const HistoryComponent = observer(({ context }) => {
  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      <Box
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "20%",
        }}
      >
        <Typography> History </Typography>
      </Box>
    </Box>
  );
});

export default HistoryComponent;
