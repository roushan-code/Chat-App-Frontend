import React, { useState } from 'react'
import { Avatar, Button, Dialog, DialogTitle, ListItem, ListItemText, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { sampleUsers } from '../constants/sampleData';
import UserItem from '../shared/UserItem';
import { useInputValidation } from '6pp';
import { useDispatch, useSelector } from 'react-redux';
import { useAvailableFriendsQuery, useNewGroupChatMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

const NewGroup = () => {
  const {isNewGroup} = useSelector((state)=> state.misc)
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupChatMutation);

  // console.log(data)
  
  const errors = [
    {
      isError,
      error
    }
  ]

  useErrors(errors);

  const [selectedMembers, setSelectedMembers] = useState([])
  let isLoadingSendFriendRequest = false;

  const groupName = useInputValidation("");

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  }
  // console.log(selectedMembers);

  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group name is required");
    if(selectedMembers.length < 0) return toast.error("Select at least three member");
    // console.log(groupName.value, selectedMembers);
    newGroup("Creating New Group...", {name: groupName.value, members: selectedMembers})
    // Creating Group 
    closeHandler()
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
    }

  return (
    <Dialog open={isNewGroup} onClose={closeHandler} >
      <Stack
        direction="column"
        p={"2rem"}
        width={"25rem"}
        spacing={"2rem"}
        bgcolor={'#7b85b6'}
      >
        <DialogTitle textAlign={"center"} > New Group </DialogTitle>

        <TextField label={"Group Name"} value={groupName.value} onChange={groupName.changeHandler} />
        <Typography variant='body1'>Members</Typography>

        <Stack >
          {isLoading ? (<Skeleton />) :
            (
              data.friends.map((friend) => (
                <UserItem
                  key={friend._id}
                  user={friend} handler={selectMemberHandler}
                  handlerIsLoading={isLoadingSendFriendRequest}
                  isAdded={selectedMembers.includes(friend._id)} />
              ))
            )
          }
        </Stack>
        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button variant='contained' onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>
          <Button variant='text' color='error' onClick={closeHandler} >Cancel</Button>
        </Stack>


      </Stack>
    </Dialog>

  )
}

export default NewGroup