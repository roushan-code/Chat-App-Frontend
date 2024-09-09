import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard';
import { motion } from 'framer-motion';

const ChatItem = ({
    avatar = [],
    name = '',
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat
}) => {
    return (
        <Link
            sx={{
                padding: "0"
            }}
            to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                gap: '1rem',
                border: sameSender ? '0.1px solid #444c5e' : 'unset',
                borderRadius: sameSender ? '10px' : 'unset',
                background: sameSender ? 'rgb(0 37 68 / 30%)' : 'unset',
                color: sameSender ? 'rgb(1 169 190)' : 'rgb(201 201 201)',
                position: 'relative'
            }}>
               <AvatarCard avatar={avatar}/>
                <Stack>
                    <Typography>{name}</Typography>
                    {
                        newMessageAlert && <Typography color={'#31b20a'} fontSize={'0.9rem'}>{newMessageAlert.count} New Message</Typography>
                    }
                </Stack>
                {
                    isOnline && <Box style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'green',
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }} />
                }
            </motion.div>
        </Link>
    )
}

export default memo(ChatItem)