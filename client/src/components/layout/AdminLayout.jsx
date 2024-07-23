import React, { useState } from 'react'
import {Box, Drawer, Grid, IconButton, Stack, styled, Tooltip, Typography} from "@mui/material"
import { Close as CloseIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, Groups as GroupsIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon } from "@mui/icons-material"
import { Link as LinkComponent,Navigate,useLocation } from "react-router-dom"
import {headerColor} from "../../constants/color"

const Link = styled(LinkComponent)`
    text-decoration: none;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: white;
    &:hover {
        color: cyan;
    }
`

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon/>
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <ManageAccountsIcon/>
    },
    {
        name: "Chats",
        path: "/admin/chats",
        icon: <GroupsIcon/>
    },
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageIcon/>
    },
]

const Sidebar = ({w="100%"}) => {
    const location = useLocation();

    const logoutHandler = () => {};

    return (
        <Stack width={w} p={"3rem"} spacing={"3rem"} sx={{bgcolor: headerColor}} height={"100%"}>
            <Typography variant='h5' color={"cyan"}>
                Uni-Connect - A Real Time Chat App
            </Typography>
            <Stack spacing={"1rem"}>
                {
                    adminTabs.map((tab) => (
                        <Link key={tab.path} to={tab.path} sx={
                            location.pathname === tab.path && {
                                color: "black",
                                bgcolor: "cyan",
                                "&:hover": {color: "black"} 
                            }
                        }
                        >
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                {tab.icon}
                                <Typography>{tab.name}</Typography>
                            </Stack>
                        </Link>
                    ))
                }
                
                <Link onClick={logoutHandler}>
                    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                        <ExitToAppIcon/>
                        <Typography>Logout</Typography>
                    </Stack>
                </Link>

            </Stack>
        </Stack>
    )
}

const isAdmin = true;

const AdminLayout = ({children}) => {

  const [isMobile,setIsMobile] = useState(false);

  const handleMobile = () => setIsMobile(!isMobile);

  const handleClose = () => setIsMobile(false);

  if(!isAdmin) return <Navigate to={"/admin"}/>

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