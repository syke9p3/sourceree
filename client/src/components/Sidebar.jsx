import React, { useState } from 'react';
import { FaCheck, FaCheckDouble, FaChevronLeft, FaGear, FaPerson } from 'react-icons/fa6';
import ReactSVG from '../assets/react.svg';
import { FaBox, FaCalendar, FaChartPie, FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ open, toggleOpen }) => {

    const { signedUser: User } = useSelector(state => state.auth)

    const Menus = [
        {
            title: 'Dashboard',
            link: '/',
            icon: <FaChartPie size={20} />
        },
        {
            title: 'Applicants',
            link: '/applicants',
            icon: <FaPerson size={20} />
        },
        {
            title: 'Vendors',
            link: '/vendors',
            icon: <FaBox size={20} />
        },
        {
            title: 'Validation',
            link: '/validation',
            icon: <FaCheckDouble size={20} />,
            gap: true
        },
        {
            title: 'Settings',
            link: '/settings',
            icon: <FaGear size={20} />
        },
    ];

    return (
        <div className={`${open ? 'w-72 transition-width duration-300' : 'w-20 transition-width duration-300'
            }  bg-blue-900 h-screen overflow-y-auto overflow-x-hidden fixed p-5 pt-8`}>
            <div className='relative h-full'>
                <button
                    onClick={() => toggleOpen()}
                    className={`w-12 h-9 flex justify-center items-center absolute cursor-pointer z-10 -right-4 pr-3 top-8 shadow-lg border-2 border-blue-900 bg-white rounded-l-full text-gray-400`}>
                    <FaChevronLeft className={` ${!open && 'rotate-180'}`} />
                </button>
                <Link to="/">
                    <div className="flex gap-x-2 items-center">
                        <img src={ReactSVG} className={`cursor-pointer duration-500 z-0 ${open && "rotate-[60deg]"}`} alt="React Logo" />
                        <h1 className={`text-white origin-left font-medium text-xl duration-300  ${!open && 'scale-0'}`}>Sourceree</h1>
                    </div>
                </Link>
                <ul className='pt-6 overflow-y'>
                    <div className=''>
                        {Menus.map((menu, index) => (
                            <Link key={index} to={menu.link}>
                                <li className={`${menu.gap ? 'mt-9' : 'mt-2'} text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#ffffff26] rounded-md`}>
                                    <div>{menu.icon}</div>
                                    <span className={`${!open && 'hidden'} origin-left duration-200 `}>{menu.title}</span>
                                </li>
                            </Link>
                        ))}
                    </div>
                    <div className='lg:absolute mt-2 bottom-0 w-full'>
                        {User && 
                        <li className={`'mt-9'  text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#ffffff26] rounded-md`}>
                            <div className='w-5'>
                                <img
                                    src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                                    className='rounded-full object-cover'
                                    
                                />
                            </div>
                            <span className={`${!open && 'hidden'} duration-200 `}>Example John</span>
                        </li>
                        }
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
