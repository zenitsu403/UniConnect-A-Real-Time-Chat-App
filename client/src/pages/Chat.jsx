import React, { useRef } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Stack } from '@mui/material';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import { lightBlue } from '@mui/material/colors';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../constants/sampleData';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
  _id: "id1",
  name: "Raman"
}

function Chat() {

  const containerRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"90%"}
        bgcolor={"lightblue"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        {
          sampleMessage.map((msg) => (
            <MessageComponent key={msg._id} message={msg} user={user} />
          ))
        }
      </Stack>

      <form
        style={{
          height: "10%",
        }}
      >

        <Stack 
          direction={"row"} 
          height={"100%"} 
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton sx={{
            position: "absolute",
            left: "1.5rem",
            rotate: "30deg"
          }}>
            <AttachFileIcon/>
          </IconButton>

          <InputBox placeholder='Type Message here...' />

          <IconButton
            type='submit'
            sx={{
              rotate: "-30deg",
              bgcolor: "lightblue",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover" : {
                bgcolor: "skyblue"
              }
            }}
          >
            <SendIcon/>
          </IconButton>
        </Stack>

      </form>

      <FileMenu />

    </>
  )
}

export default AppLayout()(Chat);