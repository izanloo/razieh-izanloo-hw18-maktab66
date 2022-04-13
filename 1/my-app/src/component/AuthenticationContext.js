
import React, { useState, createContext } from 'react'
export const valueContext = createContext({});

export default function AuthenticationContext({ children }) {
  const [userLogin, setUserlogin] = useState(null);
  const [isLogin,setIsLogin] = useState(false)

  console.log("user login:" , userLogin)

  return (
    <div>
      <valueContext.Provider value={{userLogin,setUserlogin,isLogin,setIsLogin}}>
        {children}
      </valueContext.Provider>
    </div>
  )
}



