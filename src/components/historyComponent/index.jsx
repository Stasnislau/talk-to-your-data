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
          position: "absolute",
          top: "20%",
          left: "0",
          width: "100%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {context && context.history && context.history.length > 0 ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {context.history.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "1px solid black",
                  overflowY: "auto",
                }}
              >
                <Typography> {item.text}</Typography>
                <Typography> {item.query}</Typography>

                <TableComponent queryResult={item.queryResult} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography> No history</Typography>
          </Box>
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
