import { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Context } from "../../App";
import AddSourceModal from "../addSourceModal";
import { Add } from "@mui/icons-material";
import useStateLS from "../../hooks/useStateLS";

const DataSourceList = observer(({ selected, onChange }) => {
  const [list, setList] = useStateLS("dataSources", []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box sx={{ width: "50%", height: "100%", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <FormControl sx={{ m: 1, width: 500 }}>
          <InputLabel id="demo-multiple-name-label">URL</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selected}
            onChange={(event) => {
              onChange(event.target.value);
            }}
            input={<OutlinedInput label="URL" />}
          >
            {list &&
              list.length > 0 &&
              list.map((item) => (
                <MenuItem key={item.url} value={item.url}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography fontSize="0.75rem">
                      name: {item.name}
                    </Typography>
                    <Typography fontSize="1rem">url: {item.url}</Typography>
                  </Box>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <IconButton
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <Add />
        </IconButton>
      </Box>

      {isModalOpen && (
        <AddSourceModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          list={list}
          setList={setList}
        />
      )}
    </Box>
  );
});

export default DataSourceList;
