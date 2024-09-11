import { createContext, useMemo, useContext } from 'react';
import io from 'socket.io-client'
import { server } from './components/constants/config';
import { getTokenFromStorage } from './lib/features';


const SocketContext = createContext();
const getSocket = () => useContext(SocketContext)

const SocketProvider = ({ children }) => {
    const socket = useMemo(()=> io(server, {
        query: {
            authorization:  `Bearer ${getTokenFromStorage()}`,
          },
          withCredentials: true,
    }),[]);
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export { getSocket, SocketProvider}