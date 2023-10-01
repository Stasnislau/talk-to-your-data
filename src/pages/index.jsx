import styled from "@emotion/styled";
import { Menu } from "@mui/icons-material";
import { Box, IconButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { Context } from "../App";
import InputBox from "../components/inputBox";
import DataSourceList from "../components/dataSourceList";
import ContextList from "../components/ContextList";
import GettingStarted from "../components/gettingStarted";
import ChooseModModal from "../components/chooseModModal";
import SQLQueryBox from "../components/sqlQueryBox";
import TableComponent from "../components/tableComponent";

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

  const [text, setText] = useState(
    currentContext && currentContext.keys && currentContext.keys.length > 0
      ? currentContext.text
      : ""
  );

  const [sqlQuery, setSqlQuery] = useState(
    currentContext && currentContext.keys && currentContext.keys.length > 0
      ? currentContext.sqlQuery
      : ""
  );
  const [queryResult, setQueryResult] = useState(
    currentContext && currentContext.keys && currentContext.keys.length > 0
      ? currentContext.queryResult
      : {}
  );
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isChooseModalOpen, setIsChooseModalOpen] = useState(false);
  const wsRequest = (serverUrl, requestSocket, requestData, responseSocket) => {
    const socket = io(serverUrl);

    socket.on("connect", () => {
      socket.emit(requestSocket, requestData);
    });

    return new Promise((resolve) => {
      socket.on(responseSocket, (data) => {
        resolve(data);
        socket.disconnect();
      });
    });
  };
  const sendSpeechAnyBase = async (text) => {
    try {
      store.setIsLoading(true);
      const res = await fetch("http://192.168.203.105:8000/getDDL", {
        method: "POST",
        timeout: 180000,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          textQuery: text,
          dbUrl: store.state.chosenDataUrl,
        }),
      });
      const data = await res.json();
      const ddl = data.ddl;
      console.log(ddl);
      const { sqlQuery } = await wsRequest(
        "http://192.168.203.105:5000",
        "process",
        { ddl, nlPrompt: text },
        "response"
      );
      console.log(sqlQuery);
      setSqlQuery(sqlQuery);
    } catch (error) {
      console.log(error);
    } finally {
      store.setIsLoading(false);
    }
  };
  const sendSpeechTestBase = async (text) => {
    try {
      store.setIsLoading(true);
      const res = await fetch("http://192.168.203.105:8000/getDDL", {
        method: "POST",
        timeout: 180000,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          textQuery: text,
          useTestDatabase: true,
        }),
      });
      const data = await res.json();
      const ddl = data.ddl;

      const { sqlQuery } = await wsRequest(
        "http://192.168.203.105:5000",
        "process",
        { ddl, nlPrompt: text },
        "response"
      );
      setSqlQuery(sqlQuery);
    } catch (error) {
      console.log(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const sendQueryTestDatabase = async (sqlQuery) => {
    try {
      store.setIsLoading(true);
      console.log("JA KURWA PIERDOLE");
      const res = await fetch("http://192.168.203.105:8000/execute", {
        method: "POST",
        timeout: 180000,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sqlQuery: sqlQuery,
          useTestDatabase: true,
        }),
      });
      const data = await res.json();
      console.log(data.queryResult);
      setQueryResult(data.queryResult);
    } catch (error) {
      console.log(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const sendQueryAnyDatabase = async (sqlQuery) => {
    try {
      store.setIsLoading(true);
      const res = await fetch("http://192.168.203.105:8000/execute", {
        method: "POST",
        timeout: 180000,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dbUrl: store.state.chosenDataUrl,
          sqlQuery: sqlQuery,
        }),
      });
      const data = await res.json();
      setQueryResult(data.queryResult);
    } catch (error) {
      console.log(error);
    } finally {
      store.setIsLoading(false);
    }
  };
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
      <Box
        sx={{
          width: "95%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {store.state.currentContextUrl === "temp" &&
        store.state.currentMode === "source" ? (
          <DataSourceList />
        ) : null}
        {store.state.currentContextUrl === "none" ? <GettingStarted /> : null}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {store.state.currentMode !== "none" && (
            <Box sx={{ width: "50%", height: "30%" }}>
              <InputBox
                text={text}
                setText={setText}
                onSend={
                  store.state.currentMode === "source"
                    ? sendSpeechAnyBase
                    : sendSpeechTestBase
                }
              />
            </Box>
          )}
          {sqlQuery && (
            <Box
              sx={{
                width: "50%",
                height: "30%",
              }}
            >
              <SQLQueryBox
                query={sqlQuery}
                setQuery={setSqlQuery}
                isEditable={Boolean(queryResult)}
                onSend={
                  store.state.currentMode === "source"
                    ? sendQueryAnyDatabase
                    : sendQueryTestDatabase
                }
              />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "40%",
          }}
        >
          {/* {queryResult && queryResult.keys && queryResult.keys.length > 0 && (
            <TableComponent queryResult={queryResult} />
          )} */}
          <TableComponent queryResult={queryResult} />
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
