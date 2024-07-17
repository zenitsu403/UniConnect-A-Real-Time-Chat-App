import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import {lazy, Suspense, useState} from 'react'
import { headerColor } from '../../constants/color'
import {Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationDialog = lazy(() => import("../specific/Notification"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const IconBtn = ({title,icon,onClick}) => {
    return (
        <Tooltip title={title}>
            <IconButton color='inherit' size='large' onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    );
}

const Header = () => {

    const navigate = useNavigate();

    const [isMobile,setIsMobile] = useState(false);
    const [isSearch,setIsSearch] = useState(false);
    const [isNewGroup,setIsNewGroup] = useState(false);
    const [isNotification,setIsNotification] = useState(false);

    const handleMobile = () => {
        setIsMobile((prev) => !prev)
    }

    const openSearch = () => {
        setIsSearch((prev) => !prev)
    }

    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev)
    }

    const openNotification = () => {
        setIsNotification((prev) => !prev)
    }

    const navigateToGroup = () => navigate("/groups")

    const logoutHandler = () => {
        console.log("Logout");
    }

  return (
    <>
        <Box height={"4rem"} sx={{flexGrow:1}}>
            <AppBar position='static' sx={{bgcolor: headerColor}}>
                <Toolbar>
                    <Typography
                        variant='h5'
                        color={"cyan"}
                        sx={{
                            display: {xs: "none", sm: "block"},
                        }}
                    >
                        Uni-Connect - A Real Time Chat App
                    </Typography>
                    <Box
                        sx={{
                            display: {xs: "block", sm: "none"},
                        }}
                    >
                        <IconButton color='inherit' onClick={handleMobile}>
                            <MenuIcon></MenuIcon>
                        </IconButton>
                    </Box>
                    <Box sx={{flexGrow:1}}/>
                    <Box>
                        <IconBtn 
                            title={"Search"}
                            icon={<SearchIcon />}
                            onClick={openSearch}
                        />

                        <IconBtn 
                            title={"New Group"}
                            icon={<AddIcon />}
                            onClick={openNewGroup}
                        />

                        <IconBtn 
                            title={"Manage Groups"}
                            icon={<GroupIcon />}
                            onClick={navigateToGroup}
                        />

                        <IconBtn 
                            title={"Notifications"}
                            icon={<NotificationsIcon />}
                            onClick={openNotification}
                        />

                        <IconBtn 
                            title={"Logout"}
                            icon={<LogoutIcon />}
                            onClick={logoutHandler}
                        />

                    </Box>
                </Toolbar>
            </AppBar>

        </Box>

        {isSearch && (
            <Suspense fallback={<Backdrop open />}>
                <SearchDialog />
            </Suspense>
        )}

        {isNotification && (
            <Suspense fallback={<Backdrop open />}>
                <NotificationDialog />
            </Suspense>
        )}

        {isNewGroup && (
            <Suspense fallback={<Backdrop open />}>
                <NewGroupDialog />
            </Suspense>
        )}
    </>
  )
}

export default Header