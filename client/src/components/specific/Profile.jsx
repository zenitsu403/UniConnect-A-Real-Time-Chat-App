import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import {
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
  CalendarMonth as CalenderIcon
} from "@mui/icons-material"

import moment from "moment"

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar sx={{
        width: 200,
        height: 200,
        objectFit: "contain",
        marginBottom: "1rem",
        border: "5px solid white",
      }} 
      />
      <ProfileCard text={"Living Full On !!!"} heading={"Bio"} />
      <ProfileCard text={"zenitsu403"} heading={"Username"} Icon={<UsernameIcon/>} />
      <ProfileCard text={"Mukund Acharya"} heading={"Name"} Icon={<FaceIcon/>} />
      <ProfileCard text={moment('2023-12-31T18:30:00.000Z').fromNow()} heading={"Joined"} Icon={<CalenderIcon/>} />
    </Stack>
  )
}

const ProfileCard = ({text,Icon,heading}) => (
    <Stack 
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >

      {Icon}
      
      <Stack>
        <Typography variant='body1'>{text}</Typography>
        <Typography color={"gray"} variant='caption'>{heading}</Typography>
      </Stack>

    </Stack>
)

export default Profile