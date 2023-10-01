import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../App";
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
        }}
      >
        <Typography>
          {" "}
          URL: {context && context.url ? context.url : "Choose one"}{" "}
        </Typography>
        <Typography>
          {" "}
          Name: {context && context.name ? context.name : "Create one"}{" "}
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
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                }}
              >
                <Typography> {item} </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography> No history </Typography>
        )}
      </Box>
    </Box>
  );
});

export default HistoryComponent;
