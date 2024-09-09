import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LayoutLoader } from '../components/layout/Loaders';
import AvatarCard from '../components/shared/AvatarCard';
import UserItem from '../components/shared/UserItem';
import { Link } from '../components/styles/StyledComponents';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMembersMutation, useRenameGroupMutation } from '../redux/api/api';
import { setIsAddMember } from '../redux/reducers/misc';


const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConfirmDeleteDialog'))
const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'))



const Groups = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const {isAddMember} = useSelector(state => state.misc);

  const chatId = useSearchParams()[0].get('group')
  const navigate = useNavigate();

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  )

  const [renameGroup, isLoadingRenameGroup ] = useAsyncMutation(useRenameGroupMutation);

  const [removeMember, isLoadingRemoveMember ] = useAsyncMutation(useRemoveGroupMembersMutation);
  
  const [deleteGroup, isLoadingDeleteGroup ] = useAsyncMutation(useDeleteChatMutation);
  

  const fetchedGroupName = groupDetails?.data?.chat?.name


  const navigateback = () => {
    navigate('/');
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  }

  const [isEdit, setIsEdit] = useState(false)
  const [groupName, setGroupName] = useState(fetchedGroupName)
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("")
  const [members, setMembers] = useState([])

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error
    },
  ]

  useErrors(errors)

  useEffect(() => {
    if (groupDetails?.data) {
      setGroupName(groupDetails?.data?.chat?.name);
      setGroupNameUpdatedValue(groupDetails?.data?.chat?.name);
      setMembers(groupDetails?.data?.chat?.members);
    }

    return ()=>{
      setGroupName('');
      setGroupNameUpdatedValue('');
      setMembers([]);
      setIsEdit(false)
      
    }
  }, [groupDetails?.data])
  useEffect(()=>{
    if(!chatId){
      setMembers([])
      navigate('/groups')
    }
  },[chatId])

  const updateGroupName = () => {
    setIsEdit(false);
    // console.log()
    renameGroup("Updating Group Name...",{chatId, name: groupNameUpdatedValue })
    setGroupName(groupNameUpdatedValue)
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate('/groups');
    setGroupName(false)
  }

  

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId })
    console.log('Remove member', id)
  }




  const IconBtns = (<>
    <Box
      sx={{
        display: {
          xs: 'block',
          sm: 'none',
          position: 'fixed',
          right: '1rem',
          top: '1rem',
        },
      }}
    >
      <IconButton onClick={handleMobile}>
        <Menu />
      </IconButton>
    </Box>

    <Tooltip title='back'>
      <IconButton
        sx={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          bgcolor: 'rgb(0,0,0,0.75)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgb(0,0,0,0.8)',
          }
        }}
        onClick={navigateback}
      >
        <KeyboardBackspace />
      </IconButton>
    </Tooltip>
  </>);

  const GroupsName = <>
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={'1rem'} padding={'3rem'} >
      {
        isEdit ? (
          <>
            <TextField type="text" value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
            <IconButton onClick={updateGroupName} disabled={isLoadingRenameGroup} >
              <Done />
            </IconButton>
          </>
        ) : (<>
          <Typography variant={'h4'}>{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingRenameGroup} >
            <Edit />
          </IconButton>
        </>
        )
      }
    </Stack>
  </>

  const ButtonGroup =
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
      justifyContent={'center'}
    >
      <Button
        size='large'

        sx={{
          background: '#6d76a2',
          color: '#4a0000',
          transition: '1s',
          '&:hover': {
            background: '#6d76a2',
            color: '#b90000',
            boxShadow: 'inset -5px 4px 13px #303447,inset 3px -7px 6px #aab8fd',
          },
        }}

        startIcon={<Delete />}
        onClick={openConfirmDeleteHandler}>
        Delete Group
      </Button>

      <Button
        size='large'
        sx={{
          background: '#6d76a2',
          color: '#18254e',
          transition: '1s',
          '&:hover': {
            background: '#6d76a2',
            boxShadow: 'inset -5px 4px 13px #303447,inset 3px -7px 6px #aab8fd'
          }
        }}
        startIcon={<Add />}
        onClick={openAddMemberHandler}>
        Add Member
      </Button>

    </Stack>

  return myGroups.isLoading ? <LayoutLoader /> : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },

        }}
        sm={4}
        bgcolor={'rgb(9 10 13)'}
        color={'#a1b1ff'}

      >
        <h1 style={{
          padding: '1rem'
        }}>Groups</h1>
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid item xs={12} sm={8}

        sx={{
          alignItems: "center",
          flexDirection: 'column',
          padding: '1rem 2rem',
          bgcolor: '#6d76a2',
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          right: '0',
        }}
      >

        {IconBtns}
        {groupName && <>
          {GroupsName}
          <Typography
            margin={"1rem"}
            fontWeight={'900'}
            fontSize={'2rem'}
            alignSelf={"flex-start"}
            variant="body1">
            Members
          </Typography>

          <Stack
            maxwidth={"45rem"}
            width={"100%"}
            border={'1px solid #4d5370'}
            borderRadius={'29px'}
            boxSizing={"border-box"}
            padding={{
              sm: "1rem",
              xs: "0.1rem",
              md: "1rem 4rem",
            }}
            sx={{
              '&::-webkit-scrollbar': {
            width: '2px',
            borderRadius: '40%'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',

          },
            }}

            spacing={"1rem"}
            height={"50vh"}
            overflow={"auto"}

          >
            {
              isLoadingRemoveMember? <CircularProgress/>: (
                members.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={removeMemberHandler}
                  handlerIsLoading={isLoadingRemoveMember}
                  isAdded
                  styling={{
                    borderRadius: "1rem",
                    padding: "0.5rem",
                  }}
                />
              ))
            )
            }
          </Stack>

          {ButtonGroup}

        </>}
      </Grid>

      {
        isAddMember && <Suspense fallback={<Backdrop open />}><AddMemberDialog chatId={chatId} /></Suspense>
      }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      }

      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}>
        <Box
          sx={{
            width: '70vw',
            height: '100vh',
            color: '#a1b1ff',
            bgcolor: 'rgb(9 10 13)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}
        >
          <h1>Groups</h1>
          <GroupsList myGroups={myGroups?.data?.groups} />
        </Box>
      </Drawer>
    </Grid>
  )
}

const GroupsList = ({ w = "98%", myGroups = [], chatId }) => (
  <Stack spacing={'0.5rem'} width={w}>
    {myGroups.length > 0 ? (myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)) : (
      <Typography textAlign={"center"} padding="1rem" color={'white'}>
        No groups available
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group }) => {
  const { name, avatar, _id, chatId } = group;
  return (
    <Link to={`?group=${_id}`}

      sx={{
        padding: "1rem",
        position: 'relative',
        borderRadius: '10px',
        border: "0.1px solid #444c5e",
        "&:hover": {
          bgcolor: "rgb(0 37 68 / 30%)",
          color: "rgb(1 169 190)",

        }
      }}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}>
      <Stack direction={'row'} spacing={'2vh'} alignItems={'center'}>
        <AvatarCard avatar={avatar} />
        <Typography color={'#e5f2ff'}>{name}</Typography>
      </Stack>
    </Link>
  )
})

export default Groups