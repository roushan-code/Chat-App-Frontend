import React from 'react'
import { transformImage } from '../../lib/features';
import { FileOpen as FileOpenIcon} from '@mui/icons-material';

const RenderAttachment = (file, url) => {
    switch(file){
        case "video":
            return <video controls src={url} preload='none' width={'200px'}/>;
                

        case "audio":
            return <audio controls src={url} preload='none' width={'200px'}/>;
                

        case "image":
            return <img src={transformImage(url,200)} alt="Attachment" width={'200px'} height={'150px'} style={{
                objectFit: 'contain'
            }}/>;
                
                
        default:
        return <FileOpenIcon/>
    }   
    
}

export default RenderAttachment