import styled from "@emotion/styled";
import { Menu } from "@mui/icons-material";
import { Box, IconButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import InputBox from "../components/inputBox";
import DataSourceList from "../components/dataSourceList";
import ContextList from "../components/ContextList";
import GettingStarted from "../components/gettingStarted";
import ChooseModModal from "../components/chooseModModal";

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
  const fetchContext = () => {
    if (store.currentContextUrl === "") {
      store.setCurrentContextUrl("none");
      return;
    }
    if (store.currentContextUrl === "none") {
      return;
    }
    if (store.currentContextUrl === "temp") {
      return;
    }
    const data = localStorage.getItem("contexts");
    const parsedData = JSON.parse(data);
    if (!parsedData) {
      return {};
    }
    const currentContext =
      parsedData.find((context) => context.url === store.currentContextUrl) ||
      {};
    return currentContext;
  };
  useEffect(() => {
    setCurrentContext(fetchContext());
  }, [store.currentContextUrl]);
  const [currentContext, setCurrentContext] = useState(fetchContext());
  const [sqlQuery, setSqlQuery] = useState(currentContext.sqlQuery || "");
  const [output, setOutput] = useState(currentContext.output || []);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
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
          <Box
            sx={{
              width: "100%",
              height: "10%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "0 5px",
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
            <Button
              sx={{
                display: isHistoryOpen ? "flex" : "none",
                backgroundColor: "red",
              }}
              onClick={() => {
                store.setCurrentContextUrl("temp");
                setIsChooseModalOpen(true);
              }}
            >
              Add Context
            </Button>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "90%",
              flexDirection: "column",
              justifyContent: "flex-start",
              display: isHistoryOpen ? "flex" : "none",
            }}
          >
            <ContextList />
          </Box>
        </Box>
      </SideBar>
      <Box sx={{ width: "95%", height: "100%" }}>
        {store.state.currentContextUrl === "temp" ? <DataSourceList /> : null}
        {store.state.currentContextUrl === "none" ? <GettingStarted /> : null}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "50%", height: "20%" }}>
            <InputBox />
          </Box>
        </Box>
      </Box>
      {store.state.currentContextUrl === "temp" && isChooseModalOpen && (
        <ChooseModModal
          open={isChooseModalOpen}
          onClose={() => {
            setIsChooseModalOpen(false);
          }}
        />
      )}
    </Container>
  );
});

export default MainPage;
