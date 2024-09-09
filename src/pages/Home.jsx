import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box bgcolor={'-moz-initial'}>
      <Typography variant="h5" textAlign={'center'} p={'2rem'}>Select a friend to chat</Typography>
    </Box>
  )
}

export default AppLayout()(Home);