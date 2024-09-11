import moment from "moment";

const fileFormat = (url) => {
  const fileExt = url.split('.').pop();
  if (fileExt === 'mp4' || fileExt === 'mkv' || fileExt === 'webm' || fileExt === 'ogg')
    return 'video';
  if (fileExt === 'mp3' || fileExt === 'wav')
    return 'audio';
  if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif')
    return 'image';

  return 'file';

}
// https://res.cloudinary.com/ddxwcwxhl/image/upload/v1725609120/chatApp-avatar/c6d765eb-3153-4eaa-a047-909aa8f08f8d.jpg
const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`)
  return newUrl;
}

const getLast7Days = () => {
  const currentDate = moment();

  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, 'days');
    const dayName = dayDate.format("dddd");
    last7Days.unshift(dayName)
  }
  return last7Days;
}

const getOrSaveFromStorage = ({ key, value, get }) => {
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

const setTokenToLocalstorage = (token) => {
  const expirationTime = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds

  const now = new Date();
  const expirationDate = new Date(now.getTime() + expirationTime);

  const tokenWithExpiration = {
    chatToken: token,
    expiresAt: expirationDate.getTime()
  };
  localStorage.setItem("chatApp-token", JSON.stringify(tokenWithExpiration));
}

const getTokenFromStorage = ()=>{
  const token = localStorage.getItem("chatApp-token");
  // console.log(token)
  if(token){
    const {chatToken, expiresAt} = JSON.parse(token);
    const now = new Date();
    if(now.getTime() > expiresAt){
      localStorage.removeItem("chatApp-token");
      return null;
    }
    // console.log(chatToken)
    return chatToken;
  }
  return null;
}

const expireLoginToken =()=>{
  localStorage.removeItem("chatApp-token");
}

const setAdminToken = (token) => {
  const expirationTime = 15 * 60 * 1000; // 15 days in milliseconds

  const now = new Date();
  const expirationDate = new Date(now.getTime() + expirationTime);

  const tokenWithExpiration = {
    chatAdminToken: token,
    expiresAt: expirationDate.getTime()
  };
  localStorage.setItem("chatApp-Admin-token", JSON.stringify(tokenWithExpiration));
}

const getAdminToken = ()=>{
  const token = localStorage.getItem("chatApp-Admin-token");
  // console.log(token)
  if(token){
    const {chatAdminToken, expiresAt} = JSON.parse(token);
    const now = new Date();
    if(now.getTime() > expiresAt){
      localStorage.removeItem("chatApp-Admin-token");
      return null;
    }
    // console.log(chatToken)
    return chatAdminToken;
  }
  return null;
}

const expireAdminToken =()=>{
  localStorage.removeItem("chatApp-Admin-token");
}

export { fileFormat, 
  transformImage, 
  getLast7Days, 
  getOrSaveFromStorage, 
  setTokenToLocalstorage, 
  getTokenFromStorage, 
  expireLoginToken,
  setAdminToken,
  getAdminToken,
  expireAdminToken
};