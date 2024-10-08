import React from 'react'
import Header from './Header';
import Title from '../shared/Title';
import { Drawer, Grid, Skeleton } from '@mui/material';
import ChatList from '../specific/ChatList';
import {sampleChats} from "../../constants/sampleData"
import { useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { useMyChatsQuery } from '../../redux/api/api.js';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMobile } from "../../redux/reducers/misc.js"
import { useErrors } from '../../hooks/hook.jsx';

const AppLayout = () => (WrappedComponent) => {
  return (props) =>  {

    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;

    const { isMobile } = useSelector((state) => state.misc);

    const { isLoading,data,isError,error,refetch } = useMyChatsQuery("");
    
    useErrors([{isError,error}]);

    const handleDeleteChat = (e,_id,groupChat) => {
        e.preventDefault();
        console.log("Delete Chat ",_id,groupChat);
    }

    const handleMobileClose = () => dispatch(setIsMobile(false));

    return (
        <>
            <Title />

            <Header />

            {
                isLoading ? (
                    <Skeleton />
                ):(
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w='70vw' 
                            chats={data?.chats} 
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                        />
                    </Drawer>
                )
            }

            <Grid container height={"calc(100vh - 4rem)"}>
                <Grid item sm={4} md={3} height={"100%"} sx={{
                    display: {xs: "none", sm: "block"},
                }}
                >
                    {
                        isLoading ? (
                        <Skeleton />
                        ) : (
                            <ChatList 
                                chats={data?.chats} 
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                            />
                        )
                    }
                </Grid>

                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                    <WrappedComponent {...props} />
                </Grid>
                
                <Grid item md={4} lg={3} height={"100%"} sx={{
                    display: {xs: "none", md: "block"},
                    padding: "2rem",
                    bgcolor: "rgba(0,0,0,0.85)",
                }}
                >
                    <Profile />
                </Grid>
            </Grid>
        </>
    );
  };
};

export default AppLayout

// High Order Component used here to have a Common layout for all other components passed in it