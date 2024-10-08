import { AppBar, Backdrop, Box, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import {lazy, Suspense, useState} from 'react'
import { headerColor } from '../../constants/color'
import {Menu as MenuIcon, Search as SearchIcon, Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { server } from '../../constants/config.js'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { userNotExists } from '../../redux/reducers/auth'
import { setIsMobile } from '../../redux/reducers/misc.js'

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
    const dispatch = useDispatch();

    const [isSearch,setIsSearch] = useState(false);
    const [isNewGroup,setIsNewGroup] = useState(false);
    const [isNotification,setIsNotification] = useState(false);

    const handleMobile = () => {
        dispatch(setIsMobile(true));
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

    const logoutHandler = async () => {
        try {
            const {data} = await axios.get(`${server}/api/v1/user/logout`,{ withCredentials: true });
            dispatch(userNotExists());
            toast.success(data.message);
            
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!!");
        }
    }

  return (
    <>
        <Box height={"4rem"} sx={{flexGrow:1}}>
            <AppBar position='static' sx={{bgcolor: headerColor}}>
                <Toolbar>
                    <Stack alignItems={"center"}>
                        <Typography
                            variant='h5'
                            color={"cyan"}
                            sx={{
                                display: {xs: "none", sm: "block"},
                            }}
                        >
                            Uni-Connect - A Real Time Chat App
                        </Typography>
                        <Stack direction={"row"} gap={"0.3rem"}>
                            <Typography
                                variant='caption'
                                color={"white"}
                                sx={{
                                    display: {xs: "none", sm: "block"},
                                }}
                            >
                                Made with
                            </Typography>
                            <Typography
                                variant='caption'
                                color={"red"}
                                sx={{
                                    display: {xs: "none", sm: "block"},
                                }}
                            >
                                &#10084;
                            </Typography>
                            <Typography
                                variant='caption'
                                color={"white"}
                                sx={{
                                    display: {xs: "none", sm: "block"},
                                }}
                            >
                               by Mukund Acharya
                            </Typography>
                        </Stack>

                    </Stack>
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