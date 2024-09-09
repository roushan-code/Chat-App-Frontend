import { Avatar, Button, Dialog, DialogTitle, ListItem, ListItemText, Skeleton, Stack, Typography } from '@mui/material';
import React, { memo, useState } from 'react';
import { sampleNotification } from '../constants/sampleData';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { useErrors } from '../../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

const Notification = () => {
  const {isNotification} = useSelector(state => state.misc);
  const dispatch = useDispatch();

  const { isLoading, data, error, isError} = useGetNotificationsQuery();

const [acceptRequest] = useAcceptFriendRequestMutation()

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false))
    try {
      const res = await acceptRequest({requestId: _id, accept})
    if (res?.data?.success) {
      // console.log("Use Socket.io");
      toast.success(res?.data?.message);
    }else {
      toast.error(res?.data?.message || "Something Went Wrong");
      }      
    } catch (error) {
      // toast.error(error.message || "Something Went Wrong");
      console.error(error);
    }
  }
  const closeHandler = ()=>{
    dispatch(setIsNotification(false))
  }

  useErrors([{error, isError}]);

  return (
    <Dialog open={isNotification} onClose={closeHandler} >
      <Stack
        direction="column"
        p={"2rem"}
        width={"25rem"}
        bgcolor={'#0e0f0ec9'}
      >
        <DialogTitle textAlign={"center"} > Notifications </DialogTitle>
        
          {
            isLoading ? <Skeleton/> : (
              data?.allRequests.length > 0 ? (<>
              {
                data?.allRequests.map(({sender, _id}) => (
                  <NotificationItem sender={sender} _id={_id} handler={friendRequestHandler} key={_id} />
                ))
              }
            </>) : (
              <ListItem>
                <ListItemText>No Notifications</ListItemText>
              </ListItem>
            ))
          }

        
      </Stack>
    </Dialog>

  )
}

export const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  // console.log(name)
  return (
    <ListItem sx={
      {
        bgcolor: "transparent",
        borderRadius: "0.5rem",
        color: "#b5cdb0",
        "&:hover": {
          bgcolor: "#1b2f517a"
        }
      }}>
      <Stack direction={"row"}
        spacing={1}
        alignItems={"center"}
        width={"100%"}
      >

        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            width: "100%"
          }}

        >{`${name} sent you a friend request`}</Typography>
        <Stack direction={{
          xs: "column",
          sm: "row"
        }}>
          <Button sx={{
            borderRadius: "0.5rem",
            "&:hover": {
              bgcolor: "#465f7987"
            }
          }} onClick={() => handler({ _id, accept: true })}>
            Accept
          </Button>

          <Button color='error' sx={{
            borderRadius: "0.5rem",
            "&:hover": {
              bgcolor: "#8d3d3d87"
            }
          }} onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  )
})

export default Notification