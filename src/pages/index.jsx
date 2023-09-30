import styled from "@emotion/styled";
import { Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from "../App";
import InputBox from "../components/inputBox";

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

const SideBar = styled(Box)`
  width: 5%;
  &.is-open {
    width: 20%;
  }
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.5s ease-in-out;
`;

const MainPage = observer(() => {
  const store = useContext(Context);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  return (
    <Container>
      <SideBar className={isHistoryOpen ? "is-open" : ""}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            sx={{
              width: "50px",
            }}
          >
            <Menu />
          </IconButton>
        </Box>
      </SideBar>
      <Box sx={{ width: "95%", height: "100%" }}>
        <InputBox />
      </Box>
    </Container>
  );
});

export default MainPage;
