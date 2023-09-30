import { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Context } from "../../App";
import { observer } from "mobx-react-lite";

const AddSourceModal = observer(({ open, onClose }) => {
  AddSourceModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  const store = useContext(Context);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const onSubmit = (data) => {
    const { url, name } = data;
    if (url.trim() === "" || name.trim() === "") {
      return;
    }
    const newSource = { name, url };
    const dataSources = JSON.parse(localStorage.getItem("dataSources")) || [];
    dataSources.forEach((source) => {
      if (source.url === url) {
        setError("Source with this url already exists");
        return;
      }
    });
    localStorage.setItem(
      "dataSources",
      JSON.stringify([...dataSources, newSource])
    );
    store.setShouldUpdateSourceList(true);
    onClose();
  };

  const handleSubmit = (event) => {
    setError("");
    event.preventDefault();
    if (url.trim() === "" || name.trim() === "") {
      setError("Please fill all fields");
      return;
    }
    onSubmit({ url, name });
    onClose();
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Source</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="URL"
            value={url}
            onChange={handleUrlChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
        <Typography color="error">{error}</Typography>
      </DialogContent>
    </Dialog>
  );
});

export default AddSourceModal;
