import { createContext,useState } from 'react';

const defaultUser = {
  user_name: "May Parker",
  user_id: 1,
  user_role:"user",
  department:"web dev"
}
  
export const UserContext = createContext()

export const UserProvider = ({children}) =>{
  const [currentUser,setCurrentUser] = useState(defaultUser);

  return(
    <UserContext.Provider value={{currentUser,setCurrentUser}}>
      {children}
    </UserContext.Provider>
  )
}