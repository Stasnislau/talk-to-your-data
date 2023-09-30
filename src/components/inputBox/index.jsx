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
import LanguageDropdown from "../languageDropdown";

const InputBox = () => {
  const store = useContext(Context);
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const frequency = useMicFrequency({ isEnabled: Boolean(isRecording) });
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
      background-color: #dc143c;
      width: calc(40px + ${({ volume }) => Math.sqrt(volume)}px);
      height: calc(40px + ${({ volume }) => Math.sqrt(volume)}px);
      top: calc(50%-${({ volume }) => volume}px);
      left: calc(50%-${({ volume }) => volume}px);
    }
  `;
  const availableLanguages = [
    { value: "en-US", label: "English (US)" },
    { value: "pl-PL", label: "Polski (PL)" },
  ];
  const [language, setLanguage] = useState(availableLanguages[0].value);
  useEffect(() => {
    const recordText = () => {
      if ("webkitSpeechRecognition" in window) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = language;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.start();
        recognition.onresult = (event) => {
          if (isRecording) {
            const speechResult = event.results[0][0].transcript;
            setText(speechResult);
          } else {
            recognition.stop();
            setIsRecording(false);
          }
        };
        recognition.onspeechend = () => {
          recognition.stop();
          setIsRecording(false);
        };
        recognition.onerror = (event) => {
          console.log(event.error);
        };
      } else {
        return;
      }
    };
    if (isRecording) {
      recordText();
    }
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
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <LanguageDropdown
        languages={availableLanguages}
        currentLanguage={language}
        changeLanguage={setLanguage}
      />
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
                backgroundColor="red"
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
