import { Box, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../App";
import { Menu } from "@mui/icons-material";

const MainPage = observer(() => {
  const store = useContext(Context);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: isHistoryOpen ? "5%" : "20%",
          height: "100%",
          backgroundColor: "grey",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: isHistoryOpen ? "flex-end" : "flex-start",
          }}
        >
          <IconButton onClick={() => setIsHistoryOpen(!isHistoryOpen)}>
            <Menu />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});

export default MainPage;
