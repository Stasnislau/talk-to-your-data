import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import useMicFrequency from "../../hooks";
import { Mic, Send } from "@mui/icons-material";

const InputBox = () => {
  const store = useContext(Context);
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const frequency = useMicFrequency(isRecording);
  const handleSend = () => {
    // to be implemented
  };
  // eslint-disable-next-line react/prop-types
  const CustomBox = ({ volume, ...rest }) => {
    return <Box {...rest} />;
  };
  const StyledBox = styled(CustomBox)`
    & {
      position: absolute;
      border: 2px solid red;
      border-radius: 50%;
      opacity: 0.5;
      overflow: hidden;
      background-color: #dc143c;
      width: calc(40px + ${({ volume }) => Math.sqrt(volume) * 1}px);
      height: calc(40px + ${({ volume }) => Math.sqrt(volume) * 1}px);
      top: calc(50%-${({ volume }) => volume}px);
      left: calc(50%-${({ volume }) => volume}px);
    }
  `;

  useEffect(() => {
    const recordText = () => {
      if ("webkitSpeechRecognition" in window) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.start();
        recognition.onresult = (event) => {
          if (isRecording) {
            const speechResult = event.results[0][0].transcript;
            setText(speechResult);
          } else {
            recognition.stop();
          }
        };
        recognition.onspeechend = () => {
          recognition.stop();
        };
        recognition.onerror = (event) => {
          console.log(event.error);
        };
      } else {
        return;
      }
    };
    if (isRecording) recordText();
  }, [isRecording]);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <TextField
        fullWidth
        maxRows={8}
        multiline
        value={text}
        sx={{
          "& .MuiInputBase-root": {
            backgroundColor: "primary.main",
          },
        }}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSend}>
                <Send />
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                 setIsRecording(!isRecording);
                }}
              >
                <StyledBox
                  volume={frequency}
                  sx={{
                    display: isRecording ? "block" : "none",
                    pointerEvents: "none",
                    width: "100%",
                    position: "absolute",
                    height: "100%",
                  }}
                />
                <Mic />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default InputBox;
