import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactSVG from '../assets/react.svg';
import { useSelector, useDispatch } from 'react-redux';
import { signOutFailure, signOutStart, signOutSuccess } from '../app/auth/authSlice.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { FaDoorOpen, FaUser, FaSearch } from 'react-icons/fa';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

const Navbar = () => {

    // Get the signed user account from the state manager store
    const { signedUser: User } = useSelector(state => state.auth)
    console.log('logged in user:', { User })

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className='bg-white shadow-sm p-6 pr-24 mb-6 flex justify-between items-center fixed w-full'>
            {/* <Link to="/"><div className='flex gap-2 items-end'>
                <img src={ReactSVG} alt="" />
                <h1 className='text-md'>Sourceree</h1>
            </div></Link> */}

            <form
                // onSubmit={handleSubmit}
                className='bg-slate-100 p-3 rounded-lg flex items-center'
            >
                <input
                    type='text'
                    placeholder='Search...'
                    className='bg-transparent focus:outline-none w-[1rem] sm:w-[12rem] lg:w-[36rem]'
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                    <FaSearch className='text-slate-600' />
                </button>
            </form>

            <ul className=' flex gap-6 items-center text-sm '>

                {User ? // If a user is logged in, display profile pic, otherwise show signin and signup buttons
                    (
                        <UserProfileDropdown username={User.data.username} />

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

const UserProfileDropdown = ({ username }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { loading, error, signedUser: User } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()

    const Menus = [
       // { option: 'My Profile', icon: <FaUser /> },
        { option: 'Logout', icon: <FaArrowRightFromBracket /> },
    ]

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
            >
                <span className="mr-2 hidden sm:block">{username}</span>
                <img
                    src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                    className='h-8 w-8 rounded-full object-cover'
                />
                <svg
                    className="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <ul className="py-1 " role="none">
                        {/* Add more options as needed */}


                        {Menus.map((menu, index) => (
                            <li
                                onClick={handleLogout}
                                className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                                key={index}
                            >
                                {menu.icon}
                                {menu.option}
                            </li>
                        ))

                        }

                    </ul>
                </div>
            )}



        </div>
    );
};
