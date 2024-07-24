import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material';
import moment from "moment"
import { SearchField, CurveButton } from '../../components/styles/StyledComponents';
import { DoughnutChart, LineChart } from '../../components/specific/Charts';

const Widget = ({title,value,Icon}) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem"
    }}
  >
    <Stack
      alignItems={"center"}
      spacing={"1rem"}
    >
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "100%",
          border: `5px solid black`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
)

const Dashboard = () => {

  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{fontSize: "2.5rem"}}/>
        <SearchField placeholder='Start your Search here...'/>
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography sx={{display: {xs: "none", lg: "block"}}} color={"rgba(0,0,0,0.7)"}>
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NotificationsIcon/>
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} Icon={<PersonIcon/>} value={34}/>
      <Widget title={"Chats"} Icon={<GroupIcon/>} value={3}/>
      <Widget title={"Messages"} Icon={<MessageIcon/>} value={453}/>
    </Stack>
  )

  return (
    <AdminLayout>
      <Container component={"main"}>

        {Appbar}

        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
          >
            <Typography margin={"2rem 0"} variant='h4'>Last Messages</Typography>
            <LineChart value={[34,2,56,34,23,56,9]}/>
          </Paper>
          
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: {xs: "100%", sm: "50%"},
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
              height:"25rem"
            }}
          >
              <DoughnutChart labels={["Single Chats","Group Chats"]} value={[23,77]}/>

              <Stack
                direction={"row"}
                position={"absolute"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon />
                <Typography>VS</Typography>
                <PersonIcon/>
              </Stack>

          </Paper>

        </Stack>

        {Widgets}

      </Container>
    </AdminLayout>
  )
}

export default Dashboard