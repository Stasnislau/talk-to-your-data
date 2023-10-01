import styled from "@emotion/styled";
import { Menu, Add } from "@mui/icons-material";
import { Box, IconButton, Button, Divider } from "@mui/material";
import { Box, IconButton, Button, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { Context } from "../App";
import InputBox from "../components/inputBox";
import DataSourceList from "../components/dataSourceList";
import ContextList from "../components/ContextList";
import GettingStarted from "../components/gettingStarted";
import CreateContextModal from "../components/createContextModal";
import SQLQueryBox from "../components/sqlQueryBox";
import useStateLS from "../hooks/useStateLS";
import HistoryComponent from "../components/historyComponent";
import HistoryComponent from "../components/historyComponent";

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
  const [contexts, setContexts] = useStateLS("contexts", []);
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

    if (!contexts) {
      return {};
    }


    const currentContext =
      contexts.find((context) => context.url === store.currentContextUrl) || {};

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
  const [output, setOutput] = useState(
    currentContext && currentContext.keys && currentContext.keys.length > 0
      ? currentContext.output
      : []
  );
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
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
      setOutput(data.output);
    } catch (error) {
      console.log(error);
    } finally {
      store.setIsLoading(false);
    }
  };

  const sendQueryTestAnyDatabase = async (sqlQuery) => {
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
      setOutput(data.output);
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
            <Button
              color="secondary"
              variant="outlined"
              sx={{
                display: "flex",
                margin: "0.5rem",
                flex: 1,
              }}
              onClick={() => {
                store.setCurrentContextUrl("temp");
                setIsChooseModalOpen(true);
              }}
            >
              <Add />
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
            <ContextList contexts={contexts} />
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
          <Box sx={{ width: "100%", height: "60%" }}>
            <HistoryComponent context={currentContext} />
            <Divider sx={{ width: "100%", height: "1px", color: "black" }} />
          </Box>
          <Box
            width="80%"
            height="40%"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Box sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", height: "60%" }}>
            <HistoryComponent context={currentContext} />
            <Divider sx={{ width: "100%", height: "1px", color: "black" }} />
          </Box>
          <Box
            width="80%"
            height="40%"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Box sx={{ width: "100%" }}>
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
            <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <SQLQueryBox
                query={sqlQuery}
                setSqlQuery={setSqlQuery}
                isEditable={Boolean(output)}
                onSend={
                  store.state.currentMode === "source"
                    ? sendQueryTestAnyDatabase
                    : sendQueryTestDatabase
                }
              />
            </Box>
          </Box>
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
      </Box>
      {store.state.currentContextUrl === "temp" && isChooseModalOpen && (
        <CreateContextModal
          contexts={contexts}
          setContexts={setContexts}
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
