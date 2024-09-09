import moment from "moment";

const fileFormat = (url) =>{
    const fileExt = url.split('.').pop();
    if(fileExt === 'mp4' || fileExt === 'mkv' || fileExt === 'webm' || fileExt === 'ogg')
        return 'video';
    if(fileExt === 'mp3' || fileExt === 'wav' )
        return 'audio';
    if(fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif' )
        return 'image';
    
        return 'file';
    
}
// https://res.cloudinary.com/ddxwcwxhl/image/upload/v1725609120/chatApp-avatar/c6d765eb-3153-4eaa-a047-909aa8f08f8d.jpg
const transformImage = (url = "", width = 100) => {
    const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`)
    return newUrl;
}

const getLast7Days = ()=>{
    const currentDate = moment();

    const last7Days = [];
    for(let i = 0; i < 7; i++){
        const dayDate = currentDate.clone().subtract(i, 'days');
        const dayName = dayDate.format("dddd");
        last7Days.unshift(dayName)
    }
    return last7Days;
}

const getOrSaveFromStorage= ({key, value, get})=> {
    if (get) {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null || storedValue === undefined) {
          return null; // or some default value
        }
        try {
          return JSON.parse(storedValue);
        } catch (error) {
          console.error(`Error parsing stored value for key ${key}:`, error);
          return null; // or some default value
        }
      }
    else localStorage.setItem(key, JSON.stringify(value));
}

export {fileFormat , transformImage, getLast7Days, getOrSaveFromStorage}