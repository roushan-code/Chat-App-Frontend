import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import UserTable from '../../components/shared/UserTable'
import { Avatar, Skeleton, Table } from '@mui/material';
import { dashboardData } from '../../components/constants/sampleData';
import {transformImage} from '../../lib/features'
import { useFetchData } from '6pp';
import { server } from '../../components/constants/config';
import { useErrors } from '../../hooks/hook';
import { useAllAdminUsersQuery } from '../../redux/api/api';


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
  renderCell: (params)=><Avatar src={params.row.avatar} alt={params.row.avatar} sx={{
    border: '1px solid',
    margin: '5px 0'
  }} />
},
{
  field: 'name',
  headerName: 'Name',
  headerClassName: 'table-header',
  width: 200,
},
{
  field: 'username',
  headerName: 'Username',
  headerClassName: 'table-header',
  width: 200,
},
{
  field: 'friends',
  headerName: 'Friends',
  headerClassName: 'table-header',
  width: 150,
},
{
  field: 'groups',
  headerName: 'Groups',
  headerClassName: 'table-header',
  width: 200,
}
];

const UserManagement = () => {
  // const {loading,data,error} = useFetchData(`${server}/api/v1/admin/users`, "dashboard-users")

  const allUsers = useAllAdminUsersQuery();
  const { data, error, isLoading, isError } = allUsers;
  
  useErrors([{
    isError: isError,
    error: error
}])

  
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(data){
      setRows(data?.users.map((i) => ({
        ...i,
        id: i._id,
        avatar: transformImage(i.avatar, 50),
      })));
    }
  }, [data]); // add dashboardData to the dependency array

  return  (
    <AdminLayout>
      {isLoading ? <Skeleton/> : <UserTable heading={"All Users"} columns={columns} rows={rows} />}
    </AdminLayout>
  );
};

export default UserManagement