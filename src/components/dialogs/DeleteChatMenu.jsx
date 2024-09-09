import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { setIsDeleteMenu } from '../../redux/reducers/misc';
import { Delete, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';

const DeleteChatMenu = ({dispatch, deleteMenuAnchor}) => {
    const navigate = useNavigate();

    const {isDeleteMenu, selectedDeleteChat} = useSelector(state => state.misc);

    const [ deleteChat,_, deleteChatData ] = useAsyncMutation(useDeleteChatMutation);
    const [ leaveGroup,__, leaveGroupData ] = useAsyncMutation(useLeaveGroupMutation);
    
    const closeHandler= ()=>{
        dispatch(setIsDeleteMenu(false))
        deleteMenuAnchor.current = null;
    };

    const isGroup = selectedDeleteChat?.groupChat;

    const leaveGroupHandler = ()=>{
        closeHandler();
        leaveGroup("Leaving Group...", selectedDeleteChat.chatId)
    };
    const deleteChatHandler = ()=>{
        closeHandler();
        deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
    };

    useEffect(()=>{
        if(deleteChatData || leaveGroupData){
            navigate("/");
        }
    },[deleteChatData])


  return (
    <Menu 
    open={isDeleteMenu} 
    onClose={closeHandler} 
    anchorEl={deleteMenuAnchor.current}
    anchorOrigin={{
        vertical: 'center',
        horizontal: 'right'
    }}
    
    >
        <Stack 
        sx={{
            width: "10rem",
            padding: "0.3rem",
            cursor: 'pointer',
            bgcolor: 'white',
            color: 'grey',
            "&:hover":{
                        color: "red"
                    }
            
        }}
        direction={'row'}
        justifyContent={'center'}
        spacing={'0.5rem'}
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
        >
            {
                isGroup ? <>
                <ExitToApp/> <Typography>Leave Group</Typography>
                </> : <> <Delete/><Typography>Delete Chat</Typography></>
            }
        </Stack>
    </Menu>
  )
}

export default DeleteChatMenu