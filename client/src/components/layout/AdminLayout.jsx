import React, { useState } from 'react'
import {Box, Drawer, Grid, IconButton, Stack, Tooltip, Typography} from "@mui/material"
import { Close as CloseIcon, Menu as MenuIcon } from "@mui/icons-material"
import { useLocation } from "react-router-dom"
import {headerColor} from "../../constants/color"

const Sidebar = ({w="100%"}) => {
    const location = useLocation();
    return (
        <Stack width={w} p={"3rem"} spacing={"3rem"} sx={{bgcolor: headerColor}} height={"100%"}>
            <Typography variant='h5' color={"cyan"}>
                Uni-Connect - A Real Time Chat App
            </Typography>
        </Stack>
    )
}

const AdminLayout = ({children}) => {

  const [isMobile,setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  }

  const handleClose = () => setIsMobile(false);

  return (
    <>
        <Box
            sx={{
                display: {
                    xs: "block",
                    md: "none"
                },
                position: "fixed",
                right: "1rem",
                top: "1rem",
            }}
        >
            <Tooltip title="Menu">
                <IconButton onClick={handleMobile} sx={{
                    bgcolor: "lightblue",
                    color: "white",
                    ":hover": {
                        bgcolor: "skyblue",
                        color: "black"
                    }
                }}>
                    {
                        isMobile ? <CloseIcon/> : <MenuIcon/>
                    }
                </IconButton>
            </Tooltip>
        </Box>
        <Grid container minHeight={"100vh"}>
            <Grid item md={4} lg={3} sx={{
                display: {
                    xs: "none",
                    md: "block"
                }
            }}
            >
                <Sidebar/>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
                {children}
            </Grid>
        </Grid>
        
        <Drawer open={isMobile} onClose={handleClose} sx={{
            display: {xs: "block",md: "none"}
            }}
        >
            <Sidebar w="50vw" />
        </Drawer>

    </>
  )
}

export default AdminLayout