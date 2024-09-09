import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import MessageComponent from '../components/shared/MessageComponent';
import { getSocket } from '../socket';
import { ALERT, CHAT_JOIN, CHAT_LEAVE, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../components/constants/events';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteScrollTop } from '6pp';
import { setIsFileMenu } from '../redux/reducers/misc';
import { useNavigate, useParams } from 'react-router-dom';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { TypingLoader } from '../components/layout/Loaders';



const Chat = ({chatId}) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const params = useParams();
  // const id = params.chatId;
  

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)
  
  const [iamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });


  const oldMessages = useGetMessagesQuery({ chatId, page })
  const { data, error, isLoading } = oldMessages;
  // console.log(chatId,"", page)
  // console.log(data)

  const { data: fetchedOldMessages, setData: setFetchedOldMessages } = useInfiniteScrollTop(
    containerRef, 
    oldMessages?.data?.totalPages, 
    page, 
    setPage, 
    oldMessages?.data?.messages 
  )
  // console.log(fetchedOldMessages)
  const members = chatDetails?.data?.chat?.members;

  const { user } = useSelector(state => state.auth);


  const errors = [
    { isError: chatDetails?.isError, error: chatDetails?.error },
    { isError: oldMessages?.isError, error: oldMessages?.error }
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;


    // Emitting message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  }
  
  
  useEffect(() => {
    socket.emit(CHAT_JOIN, {userId: user?._id, members})
    dispatch(removeNewMessagesAlert(chatId))
    
    return () => {
      setMessages([]);
      setMessage("")
      setFetchedOldMessages([])
      setPage(1);
      socket.emit(CHAT_LEAVE, {userId: user?._id, members})
    }
  }, [chatId])

  // useEffect(()=>{
  //   if(!chatDetails.data?.chat){
  //     navigate('/');
  //   }
  // },[chatDetails.data])

  useEffect(()=>{
    if(bottomRef.current)
      bottomRef.current.scrollIntoView({behavior: 'smooth'})
  },[messages])
  
  // console.log('1: ',chatId)
      // const newMessagesListner = useCallback((data) => { // Recreate na ho barbar isliye useCallback ka istamal kiya gya h
      //   console.log("2: " , data)
      //   console.log("3: " , chatId)
      //   if (data?.chatId !== chatId) return;
        
      //   return setMessages((prevMessages) => [...prevMessages, data.message])
      // },[chatId])

  // const newMessagesListner = (data) => {
    //   console.log("2: ", data);
    //   console.log("3: ", chatIdRef.current);
    //   if (data?.chatId !== chatIdRef.current) return;
    
    //   return setMessages((prevMessages) => [...prevMessages, data.message]);
    // };
    
    const chatIdRef = useRef(null);
    
    useEffect(() => {
      chatIdRef.current = chatId;
    }, [chatId]);
    
    // console.log('1: ',chatId)

     const newMessagesListner = useCallback((data) =>{
      // console.log("2: ", data);
      // console.log("3: ", chatIdRef.current);
      if (data?.chatId !== chatIdRef.current) return;
      // console.log("ChatId is change and new data is this", data)
      return setMessages((prevMessages) => [...prevMessages, data?.message]);
    }, [chatIdRef]);
    
    const startTypingListner = useCallback((data) =>{

     if (data?.chatId !== chatIdRef.current) return;
     setUserTyping(true)

   }, [chatIdRef]);

    const stopTypingListner = useCallback((data) =>{

     if (data?.chatId !== chatIdRef.current) return;
     setUserTyping(false)

   }, [chatIdRef]);

   const alertListner = useCallback((data)=>{
    if (data?.chatId !== chatIdRef.current) return;
    const messageForAlert = {
      content: data?.message,
      sender: {
          _id: "fwer345453edfsgtef",
          name: "Admin"
      },
      chat: chatIdRef,
      createdAt: new Date().toISOString()
      };
      
      setMessages((prevMessages) => [...prevMessages, messageForAlert]);
   },[chatIdRef])

    const eventHandlers = { 
      [NEW_MESSAGE]: newMessagesListner,
      [START_TYPING]: startTypingListner,
      [STOP_TYPING]: stopTypingListner,
      [ALERT]: alertListner,
    }
    
    
    useSocketEvents(socket, eventHandlers);
    
    useErrors(errors);
    
    const allMessages = [...fetchedOldMessages, ...messages];

  
  const messageOnChange = (e)=>{
    setMessage(e.target.value)
    if (!iamTyping) {
    socket.emit(START_TYPING,{members, chatId});
    setIamTyping(true)
    }

    if(typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(()=>{
      socket.emit(STOP_TYPING, {members, chatId});
      setIamTyping(false)
    },[2000])
  }
  
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
    // console.log(fileMenuAnchor)
  }

  return chatDetails.isLoading ? <Skeleton /> : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={2}
        bgcolor={'-moz-initial'}
        sx={{
          height: "90%",
          width: "100%",
          '&::-webkit-scrollbar': {
            width: '2px',
            borderRadius: '40%'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',

          },
        }}
        overflow={'auto'}
      >
        {
          allMessages.map((i) => (
            <MessageComponent key={i?._id} message={i} user={user} />
          ))
        }
        {
          userTyping && <TypingLoader/>
        }
        
        <div ref={bottomRef}/>
      </Stack>



      <form action="" onSubmit={submitHandler} style={{
        height: '10%',
      }}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <IconButton sx={{
            color: 'rgb(2 14 48)',
            left: '1.5rem',
            position: 'absolute'
          }}
            onClick={handleFileOpen}

          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type Message here...' value={message} onChange={messageOnChange} />

          <IconButton
            type='submit'

            sx={{
              color: 'white',
              marginLeft: '1rem',
              padding: '0.5rem',

              "&:hover": {
                color: '#014927'
              },
              "&:active": {
                color: '#008948'
              }
            }}

          >
            <SendIcon />
          </IconButton>

        </Stack>
      </form>
      <FileMenu currentElement={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  )
}

export default AppLayout()(Chat);