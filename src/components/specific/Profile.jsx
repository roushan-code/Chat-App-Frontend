import React from 'react'
import { Avatar,  Stack, Typography } from '@mui/material'
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalendarIcon
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from '../../lib/features';

const Profile = ({user}) => {
    // console.log(user)
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar
                src={transformImage(user?.avatar?.url, 200)}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid #00bd5e",
                }}
            />
            <ProfileCard heading={"bio"} text={user.bio} />
            <ProfileCard heading={"Username"} text={user.username} Icon={<UserNameIcon/>} />
            <ProfileCard heading={"Name"} text={user.name} Icon={<FaceIcon/>}/>
            <ProfileCard heading={"Joined"} text={moment(user.createdAt).fromNow()} Icon={<CalendarIcon/>}/>
        </Stack>
    );
}

const ProfileCard = ({text, Icon, heading}) => 
<Stack
    spacing={"1rem"}
    direction={"row"}
    textAlign={"center"}
    color={"white"}
>
    {Icon && Icon}
    <Stack spacing={"0.5rem"} direction={"column"}>
        <Typography variant='body1'>{text}</Typography> 
        <Typography variant='caption' color={"gray"}>{heading}</Typography>
    </Stack>
</Stack>

;
export default Profile;