import { Drawer, Grid, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { getOrSaveFromStorage } from '../../lib/features';
import { useMyChatsQuery } from '../../redux/api/api';
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import { getSocket } from '../../socket';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../constants/events';
import DeleteChatMenu from '../dialogs/DeleteChatMenu';
import Title from '../shared/Title';
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile';
import Header from './Header';

const AppLayout = () => WrappedComponent => {
    return (props) => {
        const params = useParams();
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const chatId = params.chatId;

        const deleteMenuAnchor = useRef(null);

        const [onlineUsers, setOnlineUsers] = useState([]);

        const socket = getSocket();
        // console.log(socket?.id);

        const { isMobile } = useSelector(state => state.misc);
        const { user } = useSelector(state => state.auth);
        const { newMessagesAlert } = useSelector(state => state.chat);


        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
        useErrors(isError, error);

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
        }, [newMessagesAlert])

        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true))
            dispatch(setSelectedDeleteChat({chatId, groupChat}))
            e.preventDefault();
            deleteMenuAnchor.current = e.currentTarget;
            console.log("Delete chat", chatId, groupChat);
        }

        const handleMobileClose = () => dispatch(setIsMobile(false));

        const chatIdRef = useRef(null);

        useEffect(() => {
            chatIdRef.current = chatId;
        }, [chatId]);
        
        // console.log("1: ", chatIdRef.current)
        const newMessageAlertListner = useCallback((data) => {
            // console.log("2: ", data);
            // console.log("3: ", chatIdRef.current);
            if (data.chatId === chatIdRef.current) return;
            dispatch(setNewMessagesAlert(data));
        }, [chatId])


        const newRequestListner = useCallback(() => {
            dispatch(incrementNotification())
        }, [dispatch]);

        const refetchListner = useCallback(() => {
            refetch()
            navigate("/")
        }, [refetch]);
        
        const onlineUsersListner = useCallback((data) => {
            setOnlineUsers(data)
        }, []);

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListner,
            [NEW_REQUEST]: newRequestListner,
            [REFETCH_CHATS]: refetchListner,
            [ONLINE_USERS]: onlineUsersListner,
        }
        useSocketEvents(socket, eventHandlers);

        return (
            <div>
                <Title />
                <Header />
                <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
                {
                    isLoading ? <Skeleton /> : (
                        <Drawer open={isMobile} onClose={handleMobileClose} >
                            <ChatList w='80vw' chats={data?.chat} chatId={chatId} handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                                onlineUsers={onlineUsers}
                            />
                        </Drawer>
                    )
                }
                <Grid container height={"calc(100vh - 3rem)"} >
                    <Grid item sm={4} md={3} sx={{
                        display: { xs: "none", sm: "block" },
                        bgcolor: "rgb(9 10 13)"
                    }} height={"100%"} >
                        {
                            isLoading ? (<Skeleton />) :
                                <ChatList chats={data?.chat} chatId={chatId}
                                    handleDeleteChat={handleDeleteChat}
                                    newMessagesAlert={newMessagesAlert}
                                    onlineUsers={onlineUsers}
                                />
                        }

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={6}
                        height={"100%"}
                        color={"white"}
                        borderLeft={'1px solid #202500'}
                        borderRight={'1px solid #202500'}
                        bgcolor={'rgb(14 16 23)'}>
                        <WrappedComponent {...props} chatId={chatId} />
                    </Grid>

                    <Grid
                        item
                        md={4}
                        lg={3}
                        sx={{
                            display: { xs: "none", md: "block" },
                            padding: "2rem",
                            bgcolor: "rgb(9 10 13)",
                            color: "white"
                        }}
                        height={"100%"}>
                        <Profile user={user} />
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export default AppLayout