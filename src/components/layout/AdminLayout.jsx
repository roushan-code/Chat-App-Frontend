import { Close as CloseIcon, Dashboard, ExitToApp, Groups, ManageAccounts, Menu as MenuIcon, Message } from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Link } from '../styles/StyledComponents'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../../redux/thunks/admin'

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <Dashboard sx={{
            color: '#a1b1ff'
        }} />,
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: <ManageAccounts sx={{
            color: '#a1b1ff'
        }} />,
    },
    {
        name: "Chats",
        path: "/admin/chats",
        icon: <Groups sx={{
            color: '#a1b1ff'
        }} />,
    },
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <Message sx={{
            color: '#a1b1ff'
        }} />,
    },
]

const Sidebar = ({ w = "100%" }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(adminLogout())
    }
    return (
        <Stack width={w} height={'100vh'} alignItems={'center'} direction={"column"} p={"3rem"} spacing={"3rem"} bgcolor={'rgb(9 10 13)'} >
            <Typography variant="h5" color={'#a1b1ff'} textTransform={"uppercase"}>
                Chat App
            </Typography>
            <Stack spacing={"1rem"} width={'200px'}>
                {adminTabs.map((tab) => (
                    <Link to={tab.path} key={tab.name} style={{ textDecoration: "none", display: 'flex', width: '100%', gap: '10px', justifyContent: 'center' }}
                        sx={
                            location.pathname === tab.path && {
                                borderRadius: '10px',
                                bgcolor: '#5c5b5c57'
                            }
                        }
                    >
                        <Stack direction={"row"} alignItems={"center"}  spacing={"1rem"}>
                            {tab.icon}
                        </Stack>
                        <Typography color={'#a1b1ff'} >{tab.name}</Typography>
                    </Link>

                ))}

                <Link onClick={logoutHandler}
                    style={{ textDecoration: "none", display: 'flex', width: '100%', gap: '10px', justifyContent: 'center' }}
                >
                    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>

                        <ExitToApp sx={{
                            color: '#767676'
                        }} />

                    </Stack>
                    <Typography color={'#a1b1ff'} >Logout</Typography>
                </Link>

            </Stack>
        </Stack>
    )
}


const AdminLayout = ({ children }) => {
    const {isAdmin} = useSelector(state => state.auth);

    const [isMobile, setIsMobile] = useState(false);
    const handleMobile = () => {
        setIsMobile(!isMobile)
    }
    const handleClose = () => {
        setIsMobile(false)
    }
    if(!isAdmin) return <Navigate to="/admin" />
    return (
        <Grid container height={'100vh'} >

            <Box sx={{
                display: { xs: "block",sm: "none", md: "none" },
                position: "fixed",
                right: "1rem",
                top: "1rem",
            }}
            >
                <IconButton onClick={handleMobile} >
                    {
                        isMobile ? <CloseIcon sx={{
                            color: '#a1b1ff'
                        }} /> :
                            <MenuIcon sx={{
                                color: '#a1b1ff'
                            }} />
                    }
                </IconButton>
            </Box>


            <Grid
                item
                width={'30vw'}
                sx={{
                    display: { xs: "none", sm: "block" },
                    width: { sm: '35vw',lg: '25rem'}
                }}
                
                bgcolor={'rgb(9 10 13)'}
                color={'#a1b1ff'}
                overflow={'auto'}
            >
                <Sidebar />
            </Grid>
            <Grid
                item
                
                sx={{
                    width: { xs: "100vw", sm: "calc(100vw - 35vw)", lg: 'calc(100vw - 25rem)'  },
                }}
                color={'#a1b1ff'}
                borderLeft={'1px solid #202500'}
                borderRight={'1px solid #202500'}
                bgcolor={'rgb(14 16 23)'}
                height={'100vh'}
                overflow={'auto'}
            >
                {children}
            </Grid>

            <Drawer open={isMobile} onClose={handleClose} >
                <Sidebar />
            </Drawer>


        </Grid >

    )
}

export default AdminLayout