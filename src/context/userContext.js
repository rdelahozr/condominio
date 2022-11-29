import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState();

  return(
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext);

export {
  UserContextProvider,
  useUserContext
}