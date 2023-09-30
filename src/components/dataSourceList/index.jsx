import { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, IconButton, Typography } from "@mui/material";
import { Context } from "../../App";
import { Add, ExpandLess, ExpandMore } from "@mui/icons-material";
import AddSourceModal from "../addSourceModal";

const DataSourceList = observer(() => {
  const store = useContext(Context);
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    const data = localStorage.getItem("dataSources");
    const parsedData = JSON.parse(data);
    setList(parsedData);
    store.setChosenDataUrl(parsedData[0].url) || "";
    store.setShouldUpdateSourceList(false);
  }, [store.shouldUpdateSourceList]);
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50px",
        left: "50%",
        width: "500px",
        height: isHidden ? "fit-content" : "30%",
      }}
    >
      {isHidden ? (
        <Box
          sx={{
            width: "100%",
            height: "100px",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "Center",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                current source: {store.state.chosenDataUrl}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => setIsHidden(false)}>
              <ExpandMore />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box sx={{ width: "100%", height: "100%", border: "1px solid black" }}>
          <Box
            sx={{
              width: "100%",
              maxHeight: "70%",
              overflowY: "auto",
            }}
          >
            {list &&
              list.length > 0 &&
              list.map((item) => (
                <Box
                  key={item.url}
                  onClick={() => {
                    store.setChosenDataUrl(item.url);
                  }}
                  sx={{
                    padding: "0 5px",
                    display: "flex",
                    boxSizing: "border-box",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "100%",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor:
                        item.url === store.state.chosenDataUrl
                          ? "grey"
                          : "rgba(0, 0, 0, 0.1)",
                    },
                    backgroundColor:
                      item.url === store.state.chosenDataUrl ? "grey" : "white",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "50%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                      }}
                    >
                      Name:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "50%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      Url:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {item.url}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
          <Box sx={{ width: "100%", height: "15%" }}>
            <Box
              onClick={() => {
                setIsModalOpen(true);
              }}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Add />
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Add Data Source
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "15%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => setIsHidden(true)}>
              <ExpandLess />
            </IconButton>
          </Box>
        </Box>
      )}
      {isModalOpen && (
        <AddSourceModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
});

export default DataSourceList;
