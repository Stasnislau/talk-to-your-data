import { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { Context } from "../../App";
import { observer } from "mobx-react-lite";

const chooseModModal = observer(({ open, onClose }) => {
  chooseModModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const store = useContext(Context);
  const mods = [
    { value: "testDatabase", label: "Test JPK database" },
    { value: "source", label: "Source" },
  ];
  const [chosenMod, setChosenMod] = useState();
  const [error, setError] = useState("");
  const onSubmit = (data) => {
    const { chosenMod } = data;
    if (chosenMod !== "source" && chosenMod !== "testDatabase") {
      setError("Please choose mode");
      return;
    }
    store.setCurrentMode(chosenMod);
    onClose();
  };

  const handleSubmit = (event) => {
    setError("");
    event.preventDefault();
    if (chosenMod !== "source" && chosenMod !== "testDatabase") {
      setError("Please choose mode");
      return;
    }
    onSubmit({ chosenMod });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose mode</DialogTitle>
      <DialogContent
        sx={{
          minWidth: "200px",
          minHeight: "200px",
        }}
      >
        <form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Choose mode"
              select
              sx={{
                marginTop: "1rem",
              }}
              value={chosenMod}
              onChange={(e) => {
                setChosenMod(e.target.value);
              }}
            >
              {mods.map((mod) => (
                <MenuItem key={mod.value} value={mod.value}>
                  {mod.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                marginTop: "3rem",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </form>
        <Typography color="error">{error}</Typography>
      </DialogContent>
    </Dialog>
  );
});

export default chooseModModal;