import { useContext } from 'react';
import { valueContext } from './AuthenticationContext'
import LogOut from './LogOut';

function Withchek(Component) {
    return function WithchekC() {
        const {userLogin,isLogin, setUserlogin, setIsLogin } = useContext(valueContext)
        function logOut() {
            setIsLogin(false)
            setUserlogin(null)
        }
        return (
            <>			

                <Component firstName={userLogin.firstName} logOut={logOut} />
            </>
        )
    }
}
export default Withchek