import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import { Context } from "../../App";
const mocksContext = [
  {
    name: "Mock 1",
    url: "postgres://postgres:postgres@localhost:5432/postgres",
    textQuery: "Znajdź wszystkie osoby o imieniu Jan",
    sqlQuery: "SELECT * FROM osoby WHERE imie = 'Jan'",
    queryResult: [
      {
        headers: ["id", "imie", "nazwisko", "wiek"],
        data: [
          [1, "Jan", "Kowalski", 18],
          [2, "Jan", "Nowak", 20],
        ],
      },
    ],
  },
];
const ContextList = observer(() => {
  const store = useContext(Context);
  const [list, setList] = useState([]);
  useEffect(() => {
    // const data = localStorage.getItem("contexts");
    // const parsedData = JSON.parse(data);
    // setList(parsedData);
    setList(mocksContext);
    store.setCurrentContextUrl("none");
    store.setShouldUpdateContextList(false);
  }, [store.setShouldUpdateContextList]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {list &&
        list.length > 0 &&
        list.map((context) => (
          <Box
            key={context.url}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor:
                store.state.currentContextUrl === context.url
                  ? "rgba(0, 0, 0, 0.1)"
                  : "#ffffff",
              "&:hover": {
                backgroundColor: store.state.currentContextUrl === context.url,
              },
            }}
            onClick={() => {
              store.setCurrentContextUrl(context.Url);
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                boxSizing: "border-box",
                padding: "0 5px",
              }}
            >
              <Box
                sx={{ width: "100%", maxHeight: "1.5rem", overflow: "hidden" }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "var(--color-primary)",
                  }}
                >
                  {context.name}
                </Typography>
              </Box>
              <Box
                sx={{ width: "100%", maxHeight: "1.5rem", overflow: "hidden" }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "var(--color-primary)",
                    breakWord: "break-all",
                  }}
                >
                  {context.url}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  );
});

export default ContextList;
