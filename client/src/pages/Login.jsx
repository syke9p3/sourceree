import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const naviagateTo = useNavigate()

    const [error, setError] = useState(null)
    const [userData, setUserData] = useState({
        email: '',
        password: '',
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

        console.log(" Login user data: ", userData)
        axios.post('http://localhost:8080/api/auth/signin', userData)
            .then(response => {
                // naviagateTo('/')
                if (response.data.error) {
                    setError(response.data.error)
                } else {
                    console.log(response.data)
                    setError(null)
                }

            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <form onSubmit={(e) => { handleSubmit(e) }} className='bg-white max-w-md border-2 border-solid flex flex-col gap-2 mx-auto p-6'>
                <h3 className="font-bold text-xl mb-4">LOG IN</h3>
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
                <button className="bg-green-600 font-bold text-white rounded p-2 my-6" type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login