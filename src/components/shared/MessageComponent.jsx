import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightblue } from '../constants/color';
import moment from 'moment';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';
import {motion} from 'framer-motion'

const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments = [], createdAt } = message;
    const sameSender = sender?._id === user?._id;
    const timeAgo = moment(createdAt).fromNow();

    return (
        <motion.div
        initial={{opacity: 0, x: '-100%'}}
        whileInView={{opacity: 1, x: 0}}
            style={{
                alignSelf: sameSender ? "flex-end" : "flex-start",
                backgroundColor: sameSender ? "#2b334e" : "#3a474f",
                boxShadow: sameSender ? "inset 19px 19px 38px #456070, inset -19px -19px 38px #263224" : "inset 19px 19px 38px #393f5a, inset -19px -19px 38px #552e4c",
                color: "white",
                borderRadius: "10px",
                padding: "0.5rem",
                width: "fit-content"
            }}
        >

            {!sameSender && <Typography variant="caption" color={'#ee1fd1'} fontWeight={'600'} >{sender?.name}</Typography>}
            {content && <Typography >{content}</Typography>}
            {
                attachments.length > 0 && attachments.map((attachment, index) => {
                    const url = attachment?.url;
                    const file = fileFormat(url);
                    return (
                        <Box key={attachment?.url}>
                            <a href={url} target='_blank' download style={{
                                color: 'black',

                            }}>
                                {
                                    RenderAttachment(file, url)
                                }
                            </a>
                        </Box>
                    )
                })
            }
            <Typography variant='caption' color={'rgb(149 149 149)'} >{timeAgo}</Typography>
        </motion.div>
    )
}

export default memo(MessageComponent)