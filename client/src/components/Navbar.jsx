import React from 'react'
import { Link } from 'react-router-dom'
import ReactSVG from '../assets/react.svg';
import { useSelector } from 'react-redux';

const Navbar = () => {
    
    // Get the signed user account from the state manager store
    const { signedUser: User } = useSelector(state => state.auth)
    console.log('logged in user:', { User })


    return (
        <nav className='bg-white shadow-sm p-6 mb-6 flex justify-between items-center'>
            <Link to="/"><div className='flex gap-2 items-end'>
                <img src={ReactSVG} alt="" />
                <h1 className='text-md'>Sourceree</h1>
            </div></Link>

            <ul className='text-white flex gap-6 items-center text-sm font-bold tracking-wide'>
                <li className=''>
                    {/* <Link to='/'>Dashboard</Link> */}
                </li>

                {User ? // If a user is logged in, display profile pic, otherwise show signin and signup buttons
                    (
                        <Link to="/profile">
                            <div className='flex gap-2 items-center'>
                                <span className='text-xs font-normal opacity-90'>{User.data.username}</span>
                                <img
                                    src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                                    className='h-8 w-8 rounded-full object-cover'
                                />
                            </div>
                        </Link>
                    )
                    : (<>
                        <li className='text-blue-500'>
                            <Link to='/signup'>Sign Up</Link>
                        </li>
                        <li className='px-3 py-2 bg-blue-500 rounded'>
                            <Link to='/login'>Log In</Link>
                        </li>
                    </>)
                }

            </ul>
        </nav>
    )
}

export default Navbar