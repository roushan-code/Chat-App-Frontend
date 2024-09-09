import { Button, Dialog, DialogTitle, Stack,Skeleton, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../constants/sampleData'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../../redux/reducers/misc'

const AddMemberDialog = ({  chatId }) => {
    const dispatch = useDispatch();
    const {isAddMember} = useSelector(state => state.misc);
    const [addMembers, isLoadingAddMember ] = useAsyncMutation(useAddGroupMembersMutation)

    const {isLoading, data, isError, error} = useAvailableFriendsQuery(chatId);
    // console.log(data?.availableFriends)

    const [availableFriends, setAvailableFriends] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([])
    let isLoadingSendFriendRequest = false;


    const selectMemberHandler = (id) => {
        setAvailableFriends(prev => prev.map(user => user._id === id ? { ...user, isAdded: !user.isAdded } : user))
        setSelectedMembers((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    }


    const addMemberSubmitHandler = () => {
        addMembers("Adding Members...", {members: selectedMembers, chatId})
        closeHandler();
    }
    const closeHandler = () => {
        // setSelectedMembers([])
        // setMembers([]);
        dispatch(setIsAddMember(false))
    }

    useErrors([
        {
            isError,
            error
        }
    ])

    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
                <Stack spacing={"1rem"}>
                    {
                       isLoading ? <Skeleton /> : (data?.availableFriends.length > 0 ? (data?.availableFriends.map((user) => (
                            <UserItem 
                            key={user._id} 
                            user={user} 
                            handler={selectMemberHandler} 
                            handlerIsLoading={isLoadingSendFriendRequest} 
                            isAdded={selectedMembers.includes(user._id)}/>
                        ))) : (
                            <Typography textAlign={'center'} >No Friends</Typography>
                        ))
                    }
                </Stack>

                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                >
                    <Button color="error" onClick={closeHandler}>
                        Cancel
                    </Button>
                    <Button
                        onClick={addMemberSubmitHandler}
                        variant="contained"
                        disabled={isLoadingAddMember}
                    >
                        Submit Changes
                    </Button>
                </Stack>
            </Stack >
        </Dialog >

    )
}

export default AddMemberDialog