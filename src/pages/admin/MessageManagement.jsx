import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import UserTable from '../../components/shared/UserTable';
import { dashboardData } from '../../components/constants/sampleData';
import { fileFormat, transformImage } from '../../lib/features';
import { Avatar, Box, Skeleton, Stack } from '@mui/material';
import moment from 'moment';
import RenderAttachment from '../../components/shared/RenderAttachment'
import { useFetchData } from '6pp';
import { server } from '../../components/constants/config';
import { useErrors } from '../../hooks/hook';


const columns = [{
  field: 'id',
  headerName: 'ID',
  headerClassName: 'table-header',
  width: 200,
},
{
  field: 'attachments',
  headerName: 'Attachments',
  headerClassName: 'table-header',
  width: 200,
  renderCell: (params)=>{
    const {attachments} = params.row;

    return attachments?.length > 0 ? attachments.map((i)=>{
      const url = i.url;
      const file = fileFormat(url);

      return <Box>
        <a href={url} download
        target='_blank'
        style={{
          color: "black",
        }}
        >
          {RenderAttachment(file, url)}
        </a>
      </Box>
    }) : (<></>)
  }
},
{
  field: 'content',
  headerName: 'Content',
  headerClassName: 'table-header',
  width: 400,
},
{
  field: 'sender',
  headerName: 'Sent By',
  headerClassName: 'table-header',
  width: 200,
  renderCell: (params)=>(
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      <Avatar src={params.row.sender.avatar} alt={params.row.name} sx={{
    border: '1px solid',
    margin: '5px 0'
  }} />
      <span>{params.row.sender.name}</span>
    </Stack>
  )
},
{
  field: 'chat',
  headerName: 'Chat',
  headerClassName: 'table-header',
  width: 220,
},
{
  field: 'groupChat',
  headerName: 'Group Chat',
  headerClassName: 'table-header',
  width: 100,
},
{
  field: 'createdAt',
  headerName: 'Time',
  headerClassName: 'table-header',
  width: 250,
},
];

const MessageManagement = () => {
  const {loading,data,error} = useFetchData(`${server}/api/v1/admin/messages`, "dashboard-messages")
  console.log(data)
  useErrors([{
    isError: error,
    error: error
}])
  
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    if(data){
      setRows(data?.messages
        .map((i) => ({
        ...i,
        id: i._id,
        attachments: i.attachments || [],
        sender: {
          name: i.sender.name,
          avatar: i.sender.avatar ? transformImage(i.sender.avatar, 50) : ""
        },
        chat: i.chat,
        createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      })));
    }
  }, [data]);
  return (
    <AdminLayout>
        {loading ? <Skeleton /> : <UserTable heading={"All Messages"} columns={columns} rows={rows} rowHeight={200} />}
</AdminLayout>
  )
}

export default MessageManagement