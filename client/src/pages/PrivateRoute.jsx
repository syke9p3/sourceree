
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {

    const User = useSelector(state => state.auth.signedUser)

    return User ? <Outlet /> : <Navigate to='/login'/>
}

export default PrivateRoute