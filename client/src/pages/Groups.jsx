import React, { memo, useState } from 'react'
import { Box, Drawer, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from "@mui/icons-material"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Link } from "../components/styles/StyledComponents"
import AvatarCard from "../components/shared/AvatarCard"
import { sampleChats } from "../constants/sampleData"

function Groups() {

const chatId = useSearchParams()[0].get("group")

const navigate = useNavigate();

const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);

const navigateBack = () => {
  navigate("/");
}

const handleMobile = () => {
  setIsMobileMenuOpen(prev => !prev)
}

const handleMobileClose = () => setIsMobileMenuOpen(false);

const IconBtns = <>

  <Tooltip title="Menu">
    <Box
      sx={{
        display: {
          xs: "block",
          sm: "none",
        },
        position: "fixed",
        top: "2rem",
        right: "2rem",
      }}
    >
      <IconButton onClick={handleMobile}
        sx={{
          color: "white",
          bgcolor: "lightblue",
          ":hover" : {
            bgcolor: "skyblue",
            color: "black"
          }
        }}
      >
        <MenuIcon/>
      </IconButton>
    </Box>
  </Tooltip>

  <Tooltip title="Back">
    <IconButton 
     onClick={navigateBack}
     sx={{
      position: "absolute",
      top: "2rem",
      left: "2rem",
      color: "white",
      bgcolor: "lightblue",
      ":hover" : {
        bgcolor: "skyblue",
        color: "black"
      }
    }}
    >
      <KeyboardBackspaceIcon/>
    </IconButton>
  </Tooltip>
</>

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display:{
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={"lightblue"}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid item xs={12} sm={8} sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        padding: "1rem 3rem",
      }}>

        {IconBtns}
        {
          
        }

      </Grid>

      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          }
        }}
      >
        <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId} />
      </Drawer>

    </Grid>
  )
}

const GroupsList = ({w="100%",myGroups=[],chatId}) => {
  return(
    <Stack width={w}>
      {
        myGroups.length>0 
        ? myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id}/>)
        : <Typography textAlign={"center"} padding={"1rem"}>No groups</Typography>
      }
    </Stack>
  )
}

const GroupListItem = memo(({group,chatId}) => {
  const {name,avatar,_id} = group;
   return (
    <Link 
      to={`?groups=${_id}`}
      onClick={e => {
        if(chatId === _id) e.preventDefault(); /* to prevent re render on clicking  */
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>

      </Stack>
    </Link>
   )
});

export default Groups