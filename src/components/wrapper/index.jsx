import { observer } from "mobx-react-lite";
import { Context } from "../../App.jsx";
import { CircularProgress, Box } from "@mui/material";
import { useContext, useState } from "react";
const WrapperComponent = observer(({ children }) => {
  const store = useContext(Context);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      {children}
      <div
        style={{
          position: "fixed",
          zIndex: 5000,
        }}
      >
        {store.state.isBeingSubmitted && (
          <Box
            sx={{
              position: "fixed",
              zIndex: 5000,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
});

export default WrapperComponent;
