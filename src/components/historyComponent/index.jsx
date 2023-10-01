import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../App";
import TableComponent from "../tableComponent";
import { Divider } from "@mui/material";
const HistoryComponent = observer(({ context }) => {
  const store = useContext(Context);
  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          height: "20%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {context && context.mode === "source" ? (
          <Typography>
            {" "}
            URL: {context && context.source
              ? context.source
              : "Choose one"}{" "}
          </Typography>
        ) : (
          <Typography> Test Database</Typography>
        )}
        <Typography>
          {" "}
          Name: {context && context.talkName
            ? context.talkName
            : "Create one"}{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {context && context.history && context.history.length > 0 ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxSizing: "border-box",
              padding: "10px",
            }}
          >
            {context.history.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "1px solid black",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography>Input:&nbsp;</Typography>
                    <Typography> {item.text}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography>SQL query:&nbsp;</Typography>
                    <Typography>{item.sqlQuery}</Typography>
                  </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <TableComponent queryResult={item.queryResult} />
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography> Historia jest pusta </Typography>
        )}
      </Box>
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          color: "black",
        }}
      />
    </Box>
  );
});

export default HistoryComponent;
