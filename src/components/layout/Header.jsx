import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

import axios from 'axios';
import React, { lazy, Suspense } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userDoesNotExist } from '../../redux/reducers/auth';
import { resetNotificationCount } from '../../redux/reducers/chat';
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc';
import { server } from '../constants/config';
import { expireLoginToken, getTokenFromStorage } from '../../lib/features';

const Search = lazy(() => import('../specific/Search'));
const NewGroup = lazy(() => import('../specific/NewGroup'));
const Notification = lazy(() => import('../specific/Notification'));

const Header = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {notificationCount} = useSelector(state => state.chat);
    const {isSearch, isNewGroup, isNotification} = useSelector(state=> state.misc);
    
    const handleMobile = () => dispatch(setIsMobile(true));
    const openSearch = () => dispatch(setIsSearch(true));
    const openNewGroup = () => dispatch(setIsNewGroup(true));
    const openNotification = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount());
    };

    const logoutHandler = async() => {
        try {

            const {data} = await axios.get(`${server}/api/v1/user/logout`, {
                headers: {
                    "authorization":  `Bearer ${getTokenFromStorage()}`,
                  },
                withCredentials: true
            });
            toast.success('Logged out successfully');
            dispatch(userDoesNotExist());
            expireLoginToken();
        } catch (error) {
            toast.error(error?.response?.data?.message) || "Something Went Wrong";
        }

    }
    const navigateToGroup = () => {
        navigate("/groups")
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={"3rem"}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            overflow={'hidden'}
            position={'sticky'}
            width={'100%'}
            >
                <AppBar position='static'  >
                    <Toolbar sx={{
                        bgcolor: '#1976d2'
                    }} >
                        <Typography variant="h6" sx={{
                            display: { xs: "none", sm: 'block' },
                        }}>Chat app</Typography>

                        <Box sx={{
                            display: { xs: "block", sm: 'none' }
                        }}>
                            <IconButton color='Inherit' onClick={handleMobile} >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{
                            flexGrow: 1,
                        }} />
                        <Box 
                        >
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
                                title={"Manage Group"}
                                icon={<GroupIcon />}
                                onClick={navigateToGroup}
                            />

                            <IconBtn
                                title={"Logout"}
                                icon={<LogoutIcon />}
                                onClick={logoutHandler}
                            />

                            <IconBtn
                                title={"Notifications"}
                                icon={<NotificationsIcon />}
                                onClick={openNotification}
                                value={notificationCount}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {
            isSearch && (
                <Suspense fallback={<Backdrop open/>}>
                    <Search />
                </Suspense>
            )}

            {isNotification && (
                <Suspense fallback={<Backdrop open/>}>
                    <Notification />
                </Suspense>
            )}

            {isNewGroup && (
                <Suspense fallback={<Backdrop open/>}>
                    <NewGroup />
                </Suspense>
            )}

        </>
    )
}

const IconBtn = ({ title, icon, onClick, value }) => {
    return (
        < Tooltip title={title} >
            <IconButton color='Inherit'  onClick={onClick} >
                {
                    value ? <Badge badgeContent={value} color='error'>{icon}</Badge> : icon
                }
            </IconButton>
        </Tooltip >
    )
}

export default Header