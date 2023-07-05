import { createContext,useEffect,useState } from 'react';


  
export const UserContext = createContext()

export const UserProvider = ({children}) =>{
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('current_user')));
  useEffect(()=>{
    localStorage.setItem('current_user',JSON.stringify(currentUser))
  },[currentUser])
  return(
    <UserContext.Provider value={{currentUser,setCurrentUser}}>
      {children}
    </UserContext.Provider>
  )
}