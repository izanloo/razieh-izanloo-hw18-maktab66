import React, { useContext } from 'react';
import { valueContext } from './AuthenticationContext';
import Withchek from './Withchek';

function LogOut({firstName,logOut}) {
    const{isLogin}=useContext(valueContext)
  return (
    <div>
        {isLogin? 
         <>
       <h1>hi {firstName}</h1>
        <button type='button' onClick={logOut}>Log Out</button>
        </>:" "}

        
        
         
    </div>
  )
}
export default Withchek(LogOut)
