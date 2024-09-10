import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon, Padding, Search as SearchIcon } from '@mui/icons-material';

import React, { lazy, Suspense } from 'react'
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Search = lazy(() => import('../specific/Search'));
const NewGroup = lazy(() => import('../specific/NewGroup'));
const Notification = lazy(() => import('../specific/Notification'));

const HeaderLoader = () => {
    // const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);
    const handleMobile = () => {
        setIsMobile((prev) => !prev);
    };
    const openSearch = () => {
        setIsSearch((prev) => !prev);
    };
    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev);
    };
    const openNotification = () => {
        setIsNotification((prev) => !prev);
    };

    const logoutHandler = () => {
        console.log("logoutHandler")
    }
    const navigateToGroup = () => {
        // navigate("/groups")
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

const IconBtn = ({ title, icon, onClick }) => {
    return (
        < Tooltip title={title} >
            <IconButton color='Inherit'  onClick={onClick} >
                {icon}
            </IconButton>
        </Tooltip >
    )
}

export default HeaderLoader