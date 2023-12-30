import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../app/auth/authSlice.js';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTitle } from '../hooks/useTitle.js';

const Login = () => {

    useTitle('Login Page')

    const [signUpSuccess, setSignUpSuccess] = useState(false);

    let location = useLocation();
    const params = new URLSearchParams(location.search);
    const signUpParam  = params.get('signUpSuccess');
    console.log('signUpSuccess: ', signUpSuccess)

    useEffect(() => {
        if (signUpParam === 'true') {
            setSignUpSuccess(true);
        }
    }, [signUpParam]);

    useEffect(() => {
        if (signUpSuccess) {
            toast.success('🎉 Registration Successful!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }, [signUpSuccess]);

    const { loading, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const naviagateTo = useNavigate()

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        userId: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signInStart())
        axios.post('http://localhost:8080/api/auth/signin', userData)
            .then(response => {
                if (response.data.error) {
                    dispatch(signInFailure(response.data.error))
                    return
                } else {
                    dispatch(signInSuccess(response))
                    naviagateTo('/')
                }

            }).catch((err) => {
                dispatch(signInFailure(error))
            })
    }

    return (
        <div>
            <ToastContainer />
            <form onSubmit={(e) => { handleSubmit(e) }} className='bg-white max-w-md border-2 border-solid flex flex-col gap-2 mx-auto p-6'>
                <h3 className="font-bold text-xl mb-4">LOG IN</h3>
                <div>
                    <label htmlFor="userId" className=''>Recruiter ID</label>

                    <input
                        name="userId"
                        onChange={handleInputChange}
                        placeholder="1123"
                        className="bg-gray-200 border border-solid w-full p-2 my-2" />
                </div>
                <div>
                    <label htmlFor="email" className=''>Email</label>

                    <input
                        name="email"
                        type="email"
                        onChange={handleInputChange}
                        placeholder="name@example.com"
                        className="bg-gray-200 border border-solid w-full p-2 my-2" />
                </div>
                <div>
                    <label htmlFor="password" className=''>Password</label>

                    <input
                        name="password"
                        type="password"
                        placeholder="Your password"
                        onChange={handleInputChange}
                        className="bg-gray-200 border border-solid w-full p-2 my-2" />
                </div>
                {error && <span className='text-red-500 text-sm'>{error}</span>}
                <button disabled={loading} className="bg-blue-600 font-bold text-white rounded p-2 my-6 disabled:opacity-80" type="submit">{loading ? 'Logging in...' : 'Login'}</button>
            <p className='text-sm'>Don't have an account? <Link to='/signup'><span className='text-blue-500 font-medium'>Sign up</span></Link></p>
            </form>
            
        </div>
    );
}

export default Login