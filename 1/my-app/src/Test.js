import React, { useContext } from 'react';
import Tab from './component/Tab';
import AuthenticationContext from "./component/AuthenticationContext";
import Withchek from './component/Withchek';
import {valueContext} from './component/AuthenticationContext'
import Login from './component/Login';
function Test({firstName,logOut}) {
    const{isLogin}=useContext(valueContext)
  return (
    <div>
        {isLogin?
        <>
      <AuthenticationContext>
            <Tab/>
               </AuthenticationContext>
        </>:<Login/>}

        
        
         
    </div>
  )
}
export default Withchek(Test)
