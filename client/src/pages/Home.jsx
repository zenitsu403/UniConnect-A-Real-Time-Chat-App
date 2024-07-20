import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';

function Home() {
  return (
    <Box bgcolor={"lightblue"} height={"100%"}>
      <Typography p={"2rem"} variant='h5' textAlign={"center"}>
        Select a friend to chat with
      </Typography>
    </Box>
  )
}

export default AppLayout()(Home);