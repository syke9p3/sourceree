import { useSelector, useDispatch } from 'react-redux';
import { signOutFailure, signOutStart, signOutSuccess } from '../app/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import { useTitle } from '../hooks/useTitle.js';

const Profile = () => {

    const { loading, error, signedUser: User } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()

    useTitle('Profile Page')

    const handleLogout = async () => {
        console.log('logging out')
        dispatch(signOutStart())
        axios.post('http://localhost:8080/api/auth/signout')
        .then((res) => {
            console.log('logging out axios')
            if(res.success === false) {
                dispatch(signOutFailure(res.message))
                return
            } else {
                console.log('no error')
                dispatch(signOutSuccess())
                navigateTo('/')
            }
        }).catch((err) => {
            console.log(err)
            dispatch(signOutFailure(err))
        })
    }

    return (
        <div className='mx-auto max-w-xl '>
            {User &&
                <div className='border-2 border-solid shadow-lg flex flex-col gap-2 mx-auto p-6 bg-white'>
                    <h3 className="font-bold text-xl mt-4">Profile</h3>
                    <div className='flex justify-center items-center flex-col'>
                        <img
                            src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                            className='h-16 w-16 rounded-full object-cover'
                        />
                        <p className='font-bold'>{User.data.username}</p>
                        <p className='text-gray-500'>{User.data.email}</p>
                    </div>
                    <div className='flex justify-end'>
                        <button className="bg-red-600 font-bold text-white rounded p-2 m-2 disabled:opacity-80" onClick={handleLogout}>
                            <p>Logout</p>
                        </button>
                    </div>
                </div>}
        </div>
    );
};

export default Profile;
