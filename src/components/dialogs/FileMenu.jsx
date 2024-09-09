import { ListItem, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc';
import { AudioFile, FileCopySharp, Image, VideoFile } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useSendAttachmentsMutation } from '../../redux/api/api';

const FileMenu = ({currentElement, chatId}) => {
  const {isFileMenu} = useSelector(state => state.misc);

  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const dispatch = useDispatch();
  
  const closeFileMenu = ()=> dispatch(setIsFileMenu(false))
  

  const selectImage = ()=> imageRef.current?.click();
  const selectVideo = ()=> videoRef.current?.click();
  const selectAudio = ()=> audioRef.current?.click();
  const selectFile = ()=> fileRef.current?.click();
   
  const fileChangeHandler = async (e,key)=>{
    const files = Array.from(e.target.files);

    if(files.length <= 0) return;
    
    if(files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();
    
    // Fetching Here
    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);
      files.forEach((file)=>myForm.append("files",file));
      
      const res = await sendAttachments(myForm);

      if(res.data){
        toast.success(`${key} sent successfully`, {id: toastId});
      }
      else{
        toast.error(`Failed to send ${key}`, {id: toastId});
      }

    } catch (error) {
      toast.error(error, {id: toastId});
    } finally {
      dispatch(setUploadingLoader(false));
    }
    
  }
  
  return (
    <Menu open={isFileMenu} onClose={closeFileMenu} anchorEl={currentElement} >
        <div style={{
            width: '10rem',  
        }}>
          <MenuList >
            <MenuItem onClick={selectImage} sx={{
              gap: "1rem"
            }}>
            <Tooltip title={'Image'}>
              <Image/>
            </Tooltip>
            Image
            <input type='file' multiple accept="image/png, image/jpeg, image/gif"
            style={{display: 'none'}}
            onChange={(e)=> fileChangeHandler(e, "Images")} ref={imageRef}/>
            </MenuItem>
          

          
            <MenuItem onClick={selectAudio} sx={{
              gap: "1rem"
            }}>
            <Tooltip title={'Audio'}>
              <AudioFile/>
            </Tooltip>
            Audio
            <input type='file' multiple accept="audio/*"
            style={{display: 'none'}}
            onChange={(e)=> fileChangeHandler(e, "Audios")} ref={audioRef}/>
            </MenuItem>
          

          
            <MenuItem onClick={selectVideo} sx={{
              gap: "1rem",
            }}>
            <Tooltip title={'Video'}>
              <VideoFile/>
            </Tooltip>
            Video
            <input type='file' multiple accept="video/ogg,video/mp4,video/x-m4v,video/*"
            style={{display: 'none'}}
            onChange={(e)=> fileChangeHandler(e, "Videos")} ref={videoRef}/>
            </MenuItem>
          

          
            <MenuItem onClick={selectFile} sx={{
              gap: "1rem"
            }}>
            <Tooltip title={'File'}>
              <FileCopySharp/>
            </Tooltip>
            Files
            <input type='file' multiple 
            style={{display: 'none'}}
            onChange={(e)=> fileChangeHandler(e, "Files")} ref={fileRef}/>
            </MenuItem>
          </MenuList>
        </div>
    </Menu>
  )
}

export default FileMenu