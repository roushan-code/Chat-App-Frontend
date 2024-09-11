import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings, Group, Message, NotificationAdd, Notifications, Person } from '@mui/icons-material';
import moment from 'moment';
import { CurveButton, SearchField } from '../../components/styles/StyledComponents';
import { DoughnutChart, LineCharts } from '../../components/specific/Charts';
import { useFetchData } from '6pp';
import { server } from '../../components/constants/config';
import { LayoutLoader } from '../../components/layout/Loaders';
import { useErrors } from '../../hooks/hook';
import { useAllAdminDashboardStatsQuery } from '../../redux/api/api';

const Dashboard = () => {
    // const {loading,data,error} = useFetchData(`${server}/api/v1/admin/stats`, "dashboard-stats")
    // console.log(data)
    // const {groupsCount, totalChats, totalMessages, totalUsers, messagesChart} = data;

    const Dashboard = useAllAdminDashboardStatsQuery();
  const { data, error, isLoading, isError } = Dashboard;
    useErrors([{
        isError: isError,
        error: error
    }])

    const Appbar = 
    (<Paper
        elevation={3}
        sx={{
          borderRadius: "1rem",
          padding: '2rem',
          margin: '2rem 0',
            background: 'linear-gradient(145deg, #1a1d28, #161821)',
            boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)'
        }}
        
        >
        <Stack  direction={{
            xs: 'column',
            sm: 'row',
        }} alignItems={'center'} spacing={'1rem'}

        >
            <AdminPanelSettings sx={{
                fontSize: '3rem'
            }} />
            <SearchField placeholder='Search...' sx={{
                width: {
                    xs: '100%',
                    },
                minWidth: {
                    sm: '8rem'
                }
            }}/>
            <CurveButton>Search</CurveButton>

            <Box flexGrow={1} />

            <Typography
                display={{
                    xs: 'none',
                    lg: 'block'
                }}
                color={'#7c7c7c'}
                textAlign={'center'}
            >
                {moment().format("dddd, D MMMM YYYY")}
            </Typography>
            <Notifications sx={{
                color: '#7c7c7c',
            }} />
        </Stack>
        </Paper>
    );

    const Widgets = 
    <Stack
        direction={{
            xs: "column",
            sm: "row"
        }}
        justifyContent={'center'}
        gap={'2rem'}
        alignItems={'center'}
        margin={'2rem 0'}
        flexWrap={'wrap'}
        width={{
            xs: '100%',
            sm: '60vw',
            lg: '100%'
        }}
    >
        <Widget title={'Users'} value={data?.totalUsers} Icon={<Person/>}/>
        <Widget title={'Groups'} value={data?.groupsCount} Icon={<Group/>}/>
        <Widget title={'Messages'} value={data?.totalMessages} Icon={<Message/>}/>
    </Stack>

    
  return isLoading ? <LayoutLoader/> : (
    <AdminLayout >
        <Container component={'main'}  >
            {Appbar}

            <Stack 
            
            direction={{
                xs: "column",
                lg: "row"
            }}
            alignItems={{
                xs: 'center',
                lg: 'stretch'
            }}
            spacing={'2rem'} 
            flexWrap={'wrap'} 
            justifyContent={'center'}>
                <Paper
                    elevation={3}
                    
                    sx={{
                        borderRadius: "1rem",
                        padding: '2rem',
                        flex: 1,
                        background: 'linear-gradient(145deg, #1a1d28, #161821)',
                        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                        
                        color: '#7c7c7c',
                        
                        width: {
                            xs: '100%',
                            lg: '50%'
                        }
                    }}
                >
                    <Typography variant='h5' margin={'2rem 0'}>Last Messages</Typography>
                    <LineCharts value={data?.messagesChart}/>
                </Paper>
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: "1rem",
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: { xs: "100%", sm: "50%"},
                        position: 'relative',
                        maxWidth: '25rem',
                        background: 'linear-gradient(145deg, #1a1d28, #161821)',
                        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                        color: '#7c7c7c',

                        
                    }}
                >
                    <DoughnutChart labels={['Single Chat', 'Group Chat']}
                    value={[data?.totalChats - data?.groupsCount || 0, data?.groupsCount || 0]}
                    />
                    <Stack
                        direction={'row'}
                        spacing={'1rem'}
                        position={'absolute'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={'100%'}
                        height={'100%'}
                    >
                        <Group/>
                        <Typography>Vs</Typography>
                        <Person />
                    </Stack>
                </Paper>
            </Stack>
            {Widgets}


        </Container>
    </AdminLayout>
  )
}

const Widget = ({title, value, Icon})=> (
    <Paper
        elevation={3}
        sx={{
            borderRadius: "1rem",
            padding: '1rem',
            background: 'linear-gradient(145deg, #1a1d28, #161821)',
            boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
            width: { xs: "100%", sm: "45%", lg: '30%'}
        }}
    >
        <Stack
            direction={'row'}
            spacing={'1rem'}
            padding={'1rem'}
            alignItems={'center'}
            justifyContent={'center'}
            bgcolor={'#1a1d28'}
            borderRadius={'1rem'}
            boxShadow={'0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)'}
            color={"#7c7c7c"}
        >
            <Typography 
            variant={'h4'}
            sx={{
                
                borderRadius: '50%',
                border: '5px solid rgba(0,0,0,0.9)',
                width: '5rem',
                height: '5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >{value}</Typography>
            <Stack alignItems={'center'}>
                {Icon}
            <Typography>{title}</Typography>
            </Stack>
        </Stack>
    </Paper>
)

export default Dashboard