import { Avatar, Button, Dialog, DialogTitle, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotifications } from "../../constants/sampleData"
import {Done as DoneIcon, Close as CloseIcon} from "@mui/icons-material"

function Notification() {

  const friendRequestHandler = ({_id,accept}) => {
    
  }

  return (
    <Dialog open>
      <Stack p={{ xs:"1rem" ,sm:"2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {
          sampleNotifications.length>0 
          ? (
            sampleNotifications.map((i) => (
              <NotificationItem 
                sender={i.sender} 
                _id={i._id}
                handler={friendRequestHandler}
              />
            ))
          ) 
          : (<Typography textAlign={"center"}>No Notifications</Typography>)
        }
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({sender,_id,handler}) => {

  const {name,avatar} = sender;
  
  return (
    <ListItem>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
            <Avatar src={avatar} />

            <Typography
                variant='body1'
            >
                {`${name} sent you a friend request!`}
            </Typography>

            <Stack direction={{
              xs: "column",
              sm: "row"
            }}>
              <IconButton color='success' onClick={() => handler({_id,accept:true})} >
                <DoneIcon/>
              </IconButton>
              
              <IconButton color='error' onClick={() => handler({_id,accept:false})} >
                <CloseIcon/>
              </IconButton>
            </Stack>

        </Stack>
    </ListItem>
  )
})

export default Notification


/*

if dont want to show full notification and just ... 3 dots

Typograpghy
sx={{
  flexGrow:1,
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "100%"
}}

*/