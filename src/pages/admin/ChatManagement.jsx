import { Avatar, Skeleton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { dashboardData } from '../../components/constants/sampleData';
import AdminLayout from '../../components/layout/AdminLayout';
import AvatarCard from '../../components/shared/AvatarCard';
import UserTable from '../../components/shared/UserTable';
import { transformImage } from '../../lib/features';
import { useFetchData } from '6pp';
import { server } from '../../components/constants/config';
import { useErrors } from '../../hooks/hook';
import { useAllAdminChatsQuery } from '../../redux/api/api';


const columns = [{
  field: 'id',
  headerName: 'ID',
  headerClassName: 'table-header',
  width: 200,
},
{
  field: 'avatar',
  headerName: 'Avatar',
  headerClassName: 'table-header',
  width: 150,
  renderCell: (params) => <AvatarCard avatar={params.row.avatar} />
},
{
  field: 'name',
  headerName: 'Name',
  headerClassName: 'table-header',
  width: 300,
},
{
  field: 'totalMembers',
  headerName: 'Total Members',
  headerClassName: 'table-header',
  width: 120,
},
{
  field: 'members',
  headerName: 'Members',
  headerClassName: 'table-header',
  width: 400,
  renderCell: (params) => <AvatarCard max={100} avatar={params.row.members} />
},
{
  field: 'totalMessages',
  headerName: 'Total Messages',
  headerClassName: 'table-header',
  width: 250,
},
{
  field: 'creator',
  headerName: 'Created By',
  headerClassName: 'table-header',
  width: 150,
  renderCell: (params) => (
    <Stack direction="row" alignItems="center" spacing="1rem">
      <Avatar src={params.row.avatar} alt={params.row.avatar} sx={{
        border: '1px solid',
        margin: '5px 0'
      }} />
      <span>{params.row.creator.name}</span>
    </Stack>
  )
},
];

const ChatManagement = () => {
  // const { loading, data, error } = useFetchData(`${server}/api/v1/admin/chats`, "dashboard-chats")
  const allChats = useAllAdminChatsQuery();
  const { data, error, isLoading, isError } = allChats;
  
  useErrors([{
    isError: isError,
    error: error
  }])
  const [rows, setRows] = useState([]);
  // console.log(rows)
  useEffect(() => {
    if (data) {
      setRows(data?.transformChats
        .map((i) => (
        {
          ...i,
          id: i._id,
          avatar: i.avatar.map((i) => transformImage(i, 50)),
          members: i.members.map((i) => transformImage(i.avatar, 50)),
          creator: {
            ...i.creator,
            avatar: transformImage(i.creator.avatar, 50)
          }
        }
      )))
    }
  }, [data]); // add dashboardData to the dependency array

  return (
    <AdminLayout>
      {isLoading ? <Skeleton /> : <UserTable heading={"All Chats"} columns={columns} rows={rows} />}
    </AdminLayout>
  );
};



export default ChatManagement