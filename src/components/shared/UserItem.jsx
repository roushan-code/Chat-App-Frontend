import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { transformImage } from '../../lib/features'

const UserItem = ({user, handler, handlerIsLoading, isAdded = false, styling={}}) => {
    const {name, _id, avatar} = user
    // console.log(avatar)
  return (
    <ListItem sx={
        {
            bgcolor: "#7b85b6",
            borderRadius: "0.5rem",
            transition: "0.3s",
            "&:hover": {
                bgcolor: "#6d76a2",
                boxShadow: " inset 13px 13px 17px #3a3f56, inset -13px -13px 17px #a0adee",
            }
        }}
        
        >
        <Stack 
        direction={"row"} 
        spacing={1}
        alignItems={"center"}
        width={"100%"}
        {...styling}
        
        >

            <Avatar src={transformImage(avatar)} />
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
                
            >{name}</Typography>
            <IconButton
                size='small'
                
                sx={{
                    bgcolor: isAdded ? "error.main" : "primary.main",
                    color: "white",
                    "&:hover":{
                        bgcolor: isAdded ? "error.dark" : "primary.dark"
                    }
                }}
                onClick={()=>handler(_id)}
                disabled={handlerIsLoading}
            >
                {
                    isAdded ? <RemoveIcon /> : <AddIcon />
                }
            </IconButton>
        </Stack>
    </ListItem>
  )
}

export default memo(UserItem)